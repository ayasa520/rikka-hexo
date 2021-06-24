---
title: "计算机组织结构 合集"
tag: ['底层','计组']
categories: 'NJU 笔记'
---

{% note blue 'fas fa-bullhorn' modern %}
📖 本笔记参考计算机组织结构课程的课件, 由于时间关系, 后期缺失部分内容
{% endnote %}

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2021/05/15/计算机组织结构/COA_00">合集</a>-<a href="/2021/05/15/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2021/05/15/计算机组织结构/COA_02">定点运算</a>-<a href="/2021/05/15/计算机组织结构/COA_03">BCD 码</a>-<a href="/2021/05/15/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2021/05/15/计算机组织结构/COA_05">内置存储器</a>-<a href="/2021/05/15/计算机组织结构/COA_06">Cache</a>-<a href="/2021/05/15/计算机组织结构/COA_07">外存</a>-<a href="/2021/05/15/计算机组织结构/COA_08">纠错</a>-<a href="/2021/05/15/计算机组织结构/COA_09">RAID</a>-<a href="/2021/05/15/计算机组织结构/COA_10">内存管理</a>-<a href="/2021/05/15/计算机组织结构/COA_11">总线</a>-<a href="/2021/05/15/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2021/05/15/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}

## 系统概述
+ 指令和数据在关机时储存在外存中，开机后存储在内存
+ 冯·诺依曼计算机工作方式的基本特点是**按地址访问指令并自动按序执行程序**
+ 指令由操作码和地址码组成
+ 控制器通过执行指令来控制整个机器运行
+ 注意对**存储器**来讲,例如 $32K\times16位$的存储器意为,该存储器为 16 位可寻址, 共有 32K 个存储单元, 若对于芯片来讲,不能得到什么信息

**结构** ( Architecture ) ：对程序员可见

+ 对于程序的逻辑执行有着直接影响 
+ 例如: 该计main算机有无乘法器

**组织** ( Organization ) : 对程序员不可见

+ 操作单元及其相互联系
+ 该计算机中的乘法器是如何实现的

**Stored Program**: 意为将**指令**、**数据**以**二进制**的方式存储到**主存**中.
摩尔定律： 每 18 个月，晶体管的数量增加一倍，价格下降一半，性能提高一倍

## 冯·诺依曼体系结构：

+ 输入输出设备
+ 存储（内存）
+ 控制器: 指挥信息的处理.
+ 处理器: 实际处理信息

只有在涉及到存储器相关时,用到的是 $2^n$, 其他任何时候都是 $10^n$, 比如**时钟频率**.

## 衡量 CPU 性能的依据

$$
CPI =\frac{ \sum_{i=1}^n(CPI_i\times I_i)}{I_C},I_C = \sum_{i=1}^n I_i,
$$

$$
I_i 为某种指令的条数, CPI_i为某种指令的时钟周期数, I_C 为总的指令数,
$$

$$
 则 CPI 为每条指令的平均时钟周期数,
$$

$$
T = I_C \times CPI \times t, t 为时钟周期,
$$

$$
每秒钟总指令数 = \frac{f}{CPI} = \frac{I_C}{T}.
$$

## 存储

+ cache：主存速度较慢，如果所有指令都从 memory 中取，速度很慢。从 cache 中读取会很快。
+ memory hierarchy：
+ buffer：
  + i/o输入效率比处理慢，提高效率
  + 减小丢失和等待
1. 三要素：容量、存取时间和价格，关系如下：
   + 存取时间越短，平均每位的花费就越大
   + 存储容量越大，平均每位的花费就越小
   + 存储容量越大，存取时间就越长
1. 为了满足容量要求、性能要求，也使每位的价格低，采用了 memory hierarchy 的结构。随着层次的下降：
   + 每位价格下降
   + 容量增大
   + 存取时间变长
   + 处理器访问存储器的频率变少



## 中断：

有了中断，处理器可以在进行 I/O 操作时执行其他指令。提供中断主要是为了提高效率，因为大部分外设的速度都比处理器慢得多，假如没有中断，每次 I/O 操作后处理器都会进入空闲状态直到外设跟上进度。

+ 默认开

+ 程序可以在执行指令的时候执行另一条指令

+ 

  <iframe frameborder="0" style="width:100%;height:280px;" src="https://app.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#R3VjLcpswFP0abTO8H0uwcbtoZzqTRZOlYlRQByNGyLGdr68EEkKGpHk4dpJMJiMdriR07rmPANzFZv%2BNwqb8SXJUAcfK98BdAsfxHZf%2FFcChB1wn7oGC4ryHbA1c4wckQUuiW5yj1jBkhFQMNya4JnWN1szAIKVkZ5r9IZV5agMLNAGu17Caor9xzsoejZxQ498RLkp1sh3I%2B22gMpY3aUuYk90IcjPgLighrB9t9gtUCe4UL%2F261SNPhxejqGbPWRCo92AHdTmU87vKKaGsJAWpYZVpNKVkW%2BdI7GDxmbb5QUjDQZuDfxFjB%2Bk4uGWEQyXbVPIp2mN2Mxrfiq2ufDlb7uXO3eSgJjWjh5vxZLRKTPWybqbW9fcTl3qUIgm1ZEvX0sr3pKwgLZA084PBQVzYiGwQP4fbUFRBhu%2FN%2FaGUWDHYaS%2FwgXTEvFPU4few2spdQeaDdAEiSwySEETpxG%2FaK4LWXYkZum5gd6Edj0LTA%2FIARBnaP83L9L4yaCMpnZ2OAFvJuhypX0nsLYwE9uS6H1Smr5RbMCO38FxyC2blFq1AHIDMA2kk5CYHXIABiJcgscUg4pIMu0cpSLwnJGm9ryTVAqXJS0jU%2BeISDWckGp1JosFUW2ckVxN6O%2Bbz5OS%2BgUi59BfB%2FBQdD74ZD%2F6RzntfykXaGwml8DAya4RB%2B%2Fgxnu3NHbN62VtpKfTna2EMhDxLK%2BFFWpoP5XfPdq%2Fi8Y%2FB95Al%2FyODV3CvkoRRSniZiEXPkkWiavCSMVM4ArgR5aC%2Ba5uBzAsWEtc3FX3WQuJ%2BIv2%2BtQA8L0PY9vskrsAzz3Fflrjc0yaunsxJ8CSu6rpWIPG7wUJElBiEILFkZ5YsOyQQg0uHjx9fsA%2FzZ1icMCT6W%2F5rd0kpE0%2BPOeO3ZyYxsMJFzcdrzgKiHBAc4TWsEvlgg%2FO8j0bU4gd4120lGJc65Pv6KfCXYi8egG0fi6fi3DI5j6ecBzOUO6egfO4fiCnlXKxBR3k3Tab98mejfNL3ROejfK7Qzqk8tkESyaTBE8hnp%2Fw4s9hnVPl8ej7ubb4c5Z51OcrjGcqHLxO%2BqIvpV6R80v%2B8G%2BV8qj829z2L%2FmLvZv8A"></iframe>

## 多个中断处理的方式：

+ 顺序处理
+ 根据优先级决定优先处理的指令

## 总线

总线：各部分信息共享，包含**地址线、数据线和控制线**，前两者可以复用。

