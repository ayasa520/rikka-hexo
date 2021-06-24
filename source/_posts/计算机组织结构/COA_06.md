---
title: "计算机组织结构(六) Cache"
tag: ['底层','计组']
categories: 'NJU 笔记'
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2021/05/15/计算机组织结构/COA_00">合集</a>-<a href="/2021/05/15/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2021/05/15/计算机组织结构/COA_02">定点运算</a>-<a href="/2021/05/15/计算机组织结构/COA_03">BCD 码</a>-<a href="/2021/05/15/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2021/05/15/计算机组织结构/COA_05">内置存储器</a>-<a href="/2021/05/15/计算机组织结构/COA_06">Cache</a>-<a href="/2021/05/15/计算机组织结构/COA_07">外存</a>-<a href="/2021/05/15/计算机组织结构/COA_08">纠错</a>-<a href="/2021/05/15/计算机组织结构/COA_09">RAID</a>-<a href="/2021/05/15/计算机组织结构/COA_10">内存管理</a>-<a href="/2021/05/15/计算机组织结构/COA_11">总线</a>-<a href="/2021/05/15/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2021/05/15/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}


## 为什么需要 cache?

+ 因为 CPU 比 内存的速度要快得多.`

## 基本思路

+ 使用较小, 较快的 Cache 和相对较大,更为缓慢的 Memory
+ Cache 中包含了 Memory 中数据的**副本**
+ Cache 位于中央处理器和存储器之间,并可以被集成在 CPU 或者作为主板上的一个模块.

## Cache 工作的原理

+ <font color=FF0000>Check </font>:当处理器试图读取内存中的一个字的时候,会先检查该字是否在 Cache 中.
+ <font color=00FF00>Hit </font>: 如果确实在, 这个字被传送给处理器.
+ <font color=0000ff>Miss </font>: 否则,由一定数量的字组成的**一块( block )主存中的数据** 被读入 Cache ,然后传给处理器.
  <img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/1f77f889fe21b537409937de54e977f1790a1262.jpg" style="zoom:67%;" />

+ 时间局部性:
  未来将要使用的信息(指令和数据), 可能是现在正在使用的信息.
+ 空间局部性:
  未来将要使用的信息, 很可能与正在使用的信息在存储空间上是邻近的(比如遍历一个一维数组).

## 判断 Hit 与 Miss

+ 冯诺依曼计算机的设计:
  内存中的内容按位置寻址,而不考虑其中的数据类型.
+ Cache 中有 <font color="ff0000">标记</font>(tag) 来判断需要读取的信息是否存在于 Cache.

## 移动"块"而不是字

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/10d416f2051d0ff9ed1a4d60861da6582a74da44.webp" style="zoom:67%;" >

## 证明 Cache 机制能够提高性能

+ 设命中率为 $p$, $T_C$ 为访问Cache 的时间,$T_M$ 为访问主存的时间,则总时间为(可以认为返回数据不需要时间, 寻找花时间)
  $$T=T_Cp+(1-p)(T_C+T_M)$$
  由上面可以推出,若 $T<T_M$, 则 $p>\frac{T_C}{T_M}$ ,虽然$\frac{T_C}{T_M}$非常小,但是 Cache 的容量更要远远小于主存的容量,这就体现了局部性的作用.

## Cache 是否越大越好?

Cache 容量变大, 命中率增加会变得缓慢,因为搬来的数据可能关联性弱,对效果提升十分有限.此外,Cache 规模变大会使得 check 的时间变长.

## 映射功能

+ 因为 Cache 的行比主存块要少, 所以需要一个算法将主存中的块映射到 Cache 中的行.

### 1. 直接映射

+ 地址组成：

<iframe frameborder="0" style="width:100%;height:300px;" src="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1#R3ZjLjpswFIafxstIsQlgliFh2kW7SqVZe8AFq4CRcUoyT187mDAMpFAVRsmsYv%2B%2BxOc7vy8CWLvs9EWQIvnOI5oCtI5OwNoDhCD0bPWjlbNRXAfWSixYZLRWOLBXasS1UY8somWno%2BQ8lazoiiHPcxrKjkaE4FW320%2Bedv%2B1IDHtCYeQpH31mUUyqVWM3Fb%2FSlmcNP8MHa9uyUjT2URSJiTi1RvJCoC1E5zLupSddjTV9Bou9binG63XhQmayykDkFnYb5IeTXBmYfLcRCv4MY%2BoHrAGll8lTNJDQULdWqkEKy2RWapqUBXNdFRIerq5JniNVHmE8oxKcVZdzABs2Bh3NKiqljRstOQN5Y3RiElufJ24jV8VDIJhHPdE43b4eKHom%2B11F%2BGfmvBH3bAYDjiOQ%2B3fQhfDo0jPviDhLyrHubQQ65okkvFcVVfeeh5sXpfaagDb0B660v4vbpset1JVQbAB%2Fh7gPQgw2EKwxSBwwVaJWxDYwNsDz9UF%2FAR8twdaoZBdiCRlsWYWKiRUKEEDY%2BqQ3pqGjEWRHu4LWrJX8nKZSvMtOMvlJUDbB%2FZez3WUvKyvmZl863QT4E2zLZoDv93DX%2F0Lfgdg%2B6LsgL82Tc1aHzghENtjGYFwqZQ4j3uSIKvr5M20kwTPgc39cGxzUYPvqK3sadjgLHbrP2PE30%2BAHQkTamS8%2BzynMB6%2FBgffknNkAU14Td2pe9%2Bb1%2Fq4PY%2F6j65yNeJeSeKHd%2BqqezsNOdVbyqioh%2FzHJyCKuiYe8LC1FND%2BvfWN5fThicJxpJulkOIe0mcuIoCcVCN8USeEE8trmA8MeYJvZ4Ksqu2Hpkvbm%2B91VvAH"></iframe>

+ 定义: 内存中的一个块映射到 Cache 中固定的行.

+ 将主存中的每个块映射到**固定**的可用 Cache 中行.直接映射可以表示为:
  $$ i=j\space mod\space m$$
  其中 i 为 Cache 行号, j 为主存块号, m 为 Cache 行数 .
  为了实现访问 Cache 每一个主存地址可以看作由**三个域**组成：

    + 低 $w$ 位标识某个块中的唯一一个存储单元(字节或字).
    + 剩余 $s$ 位标识了主存 $2^s$ 个块中的一个.
      + 其中 $r$ 位标识了 cache 中的行号(cache 的行数为 $m=2^r$)
      + $s-r$ 位为 tag 位.用以区分映射到同一行的不同块.

  总结:

    + 地址长度: $(s+w)$ 位
    + 可寻址单元数: $2^{s+w}$
    + 块大小=行大小=$2^w$ 个存储单元(字节或字)
    + 主存的块数:$\frac{2^{s+w}}{2^w}=2^s$
    + cache 行数:$m=2^r$
    + cache 容量: $2^{r+w}$ 个字或者字节
    + 标记长度: $(s-r)$ 位

+ 举例:
  $m=16K=2^{14},i=j\space mod\space 2^{14}$,用 16 进制 表示地址有

<table>
<thead>
<tr>
<th style="text-align:center">cache 行</th>
<th style="text-align:center">主存块的起始地址</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">000000,010000,....FF0000</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">000004,010004,...,FF0004</td>
</tr>
<tr>
<td style="text-align:center">...</td>
<td style="text-align:center">...</td>
</tr>
<tr>
<td style="text-align:center"><span class="katex"><span class="katex-mathml mathjax-overflow"><mjx-container class="MathJax CtxtMenu_Attached_0" jax="CHTML" tabindex="0" ctxtmenu_counter="0" style="font-size: 112.9%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-semantics><mjx-mrow><mjx-msup><mjx-mn class="mjx-n"><mjx-c class="mjx-c32"></mjx-c></mjx-mn><mjx-script style="vertical-align: 0.363em;"><mjx-mn class="mjx-n" size="s"><mjx-c class="mjx-c31"></mjx-c><mjx-c class="mjx-c34"></mjx-c></mjx-mn></mjx-script></mjx-msup><mjx-mo class="mjx-n" space="3"><mjx-c class="mjx-c2212"></mjx-c></mjx-mo><mjx-mn class="mjx-n" space="3"><mjx-c class="mjx-c31"></mjx-c></mjx-mn></mjx-mrow></mjx-semantics></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>14</mn></msup><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2^{14}-1</annotation></semantics></math></mjx-assistive-mml></mjx-container></span></span></td>
<td style="text-align:center">00FFFC,01FFFC,...,FFFFFFC</td>
</tr>
</tbody>
</table>

  地址24位,其中,高8位为 tag 位,若当前存在该行的标记数与地址中的相同,则14位标识 cache 行号,  低2位标识行中的4个字节(或者字);否则,前22位标识为从主存中取一块.取的主存块的地址为22位加两位0(因为块都是以4倍数开始的,每个块有4个单元)

+ **优点**:

  + check快,从主存中存取的时候快
  + tag 短,额外存储少.
  + 不会随着容量增大而变慢
  + 实现简单

+ **缺点**:

  + 容易发生抖动:用到的两个块映射到 cache 中的同一行,于是频繁的替换.
  + 命中率低

### 2. 全相联映射

+ 地址图示:

  <iframe frameborder="0" style="width:100%;height:300px;" src="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1#R3ZdNj5swEIZ%2FzRwj8RGIOUJgt5eeUmnPXnDBKmBkTEn219cOBsKyUViVVM1eovE7tvE8Mx4C2Pvi%2BMxxlX1nCcnBMpIj2CFYlu0i%2BauEUyeYO9fslJTTRGujcKBvRIuGVhuakHoyUTCWC1pNxZiVJYnFRMOcs3Y67SfLp0%2BtcEpmwiHG%2BVx9oYnIOhVZu1H%2FRmia9U82Xa%2FzFLifrCOpM5yw9kKyI7D3nDHRWcVxT3IFr%2BfSrXu64h0OxkkplizQ5%2FqN80bHps8lTn2wnDVlQtR8A%2BygzagghwrHytvK9EotE0UuR6Y09XaEC3K8eiRzCFRWCGEFEfwkp%2Bhq6NG0I1nL0Fp2QXWrNayTmQ47jfFKQ4d8hZfxH8V%2FfBfsdR7oXjjM2zhkxVbKjBuenwKO419E3OYyQuxGAgvKSjnceMY62LwptY39URnNsQ20%2F4rbdsatlkOIthCEgEKIEPgm%2BAiiHfhS9CFywAvB2ykDPUGwm4GWKMQUIs5pqpjFEgnhUlDAqGxLvnYUNEnU8oCTmr7h1%2FNWim%2FFaCnOAToBOKHaqxGs7hrrSnXrThOAlpWttQZ%2BZ4a%2F%2FQx%2BF5BzVvYQGNrVn%2FWBE2Ii51ZGTPNeKXEft5NY9rSSF3YStAI2a8H7aGVs9%2Bq%2F3j%2Fsv9b8vXWj%2FwqcPvz9dqfXe7Pwj8Ia17svywvgP74A0XcN84OLb98LKJoBfWE8AcvNFcFXLq1UDFE%2BMOMB13XI23Ugy%2BH4IXX2XXyO2tEf"></iframe> 

+ 定义: 内存中的块可以映射到 Cache 中的任意一行.

+ 总结:

  + 地址长度 s+w 位
  + 可寻址单元数 $2^{s+w}$ 个字(字节)
  + 块大小=行大小=$2^w$ 个字(字节)
  + 主存的块数:$\frac{2^{s+w}}{2^w}=2^s$
  + cache 的行数: 不由地址格式决定
  + 标记长度=s 位

+ **优点**:

  + 避免"抖动".
  + 命中率高

+ **缺点**:

  + check 慢, 从内存中放到 cache 中慢.
  + 实现较为复杂 

### 3. 组相联映射

+ 图示:

<iframe frameborder="0" style="width:100%;height:258px;" src="https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1#R3ZhBk5sgFMc%2FDcfMiKjBY0zc9tJTOrNnVqkyVXGQ1GQ%2FfSGihrhp0qnJNHvy8QeR9%2BPxngrQutx%2FEaTOv%2FGUFsB10j1AG%2BC60PVdddHKwShLFHRKJlhqtFHYsndqRMeoO5bSxhooOS8kq20x4VVFE2lpRAje2sN%2B8MJ%2Bak0yOhG2CSmm6itLZd6p2F2O%2BlfKsrx%2FMgzCrqck%2FWDjSZOTlLcnEooBWgvOZWeV%2BzUtNL2eS3ffy4XeYWGCVvKWG8y6fpFiZ3wz65KH3lnBd1VK9XgHoKjNmaTbmiS6t1X7q7RcloVqQWWa6aiQdH9xSXBwVIUI5SWV4qCGmGjo0bQjWdhr%2BQlVz2jEbGY2zDT6qwzj8gVezn%2Fk%2F7733yzqMg98LxzwOg4VsbU2k50oDpEgyU8qr3MZIXYtSSTjlWouQmcebKFNbYGm2D6KooH2P3HzJtwa1QSxB6INwBsQY7CCYIVBvAQrJa5A7INwA8KlNvALiJYT0AqFtCGSgmWaWaKQUKEEDYyptLQyHSVLU317JGjD3snbcSrNt%2BaskkcH%2FQj4Gz3XTvKmS6wzxW1gbwC%2BLWzdOfD7E%2Fzt3%2BAPAPaPyhpEjunq1%2FrEGwKxf21HILzXlgTPm0lcZEfyjZkEz4DNvaEezYxtLmr%2BWf71b6MG54g2d1q3mkX65xQgSfb0J3wB7RO%2B%2BOBdIbzTCe8j84T590%2BA1LOJfnD20b2A4gnQVy5UFAeFJvgmlJXJwcsnZjzgugzZuxNkhCaQtyp9Xmf86K8AeMbogV8BaPo2%2ByxFCJ5XoQfWbjR9C71SgrQRRQB7Jx8Bn%2B6w44eVKNUcf5wc%2B07%2BP6H4Nw%3D%3D"></iframe> 

+ 定义: Cache 中的行分成组(Set),内存中的块搬到固定的组,组中具体的哪一行不固定.第一步类似直接映射,第二部类似全相联映射. Cache 中分为 $v$ 个组,每组包含 $k$ 个行,则:
  $$\begin{aligned}
    &m=v\times k\\
    &i=j\space mod\space v\\
  \end{aligned}$$
  其中: i 为组号, j 为主存块号,m 为主存块数,v 为组数,k 为每个组中的行数, 即 k路组(K-way Set).
+ 总结:
  + 地址长度 s+w 位
  + 可寻址单元数 $2^{s+w}$ 个字(字节)
  + 块大小=行大小=$2^w$ 个字(字节)
  + 主存的块数:$\frac{2^{s+w}}{2^w}=2^s$ 
  + cache 中每组行数= k
  + 组数 = v = $2^d$
  + cache 中的行数 = m = $k\times v=k\times 2^d$
  + 标记长度 s-d 位(同一个组中不会出现标记位相同的两个块)
+ **优点**:
  + 固定组 check ,存取,速度比全相联快
  + 命中率比直接映射高

+ **缺点**:
  + 实现复杂.
  + 若反复用的的块很多的话,仍然无法避免抖动.

## 替换算法

### 1.最近最少用

### 2.先进先出

### 3.使用最少

### 4.随机

## 写策略

### 1.写入

+ 每一次改了之后都更新内存
  + 好处:提升cache和主存一致性,保证主存中的内容都是最新的

### 2.写回

+ cache 中的行要被替换时不得不写回去,用 dirty bit 来判断数据是否发生过改写,若没有改过无需写回.

## 块大小(Cache Line Size)

+ 由极小变大,根据局部性原理命中率先是提升,因为每个块所能容纳的有用数据增多了.
+ 到极大时,且新取信息的概率小于重用信息概率时,命中率会减小.因为较大的块减少了块的个数,少量的块导致装入的数据很快会被改写;当块变大时,每个附加字距离所需字就更远,被使用的概率低.


## cache 数目

+ 多级 cache 比单一大容量 cache 效率更高

