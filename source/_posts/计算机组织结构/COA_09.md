---
title: "计算机组织结构(九) RAID 磁盘冗余阵列"
tag: ['底层','计组']
categories: 'NJU 笔记'
date: 2020-12-27
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2020/12/27/计算机组织结构/COA_00">合集</a>-<a href="/2020/12/27/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2020/12/27/计算机组织结构/COA_02">定点运算</a>-<a href="/2020/12/27/计算机组织结构/COA_03">BCD 码</a>-<a href="/2020/12/27/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2020/12/27/计算机组织结构/COA_05">内置存储器</a>-<a href="/2020/12/27/计算机组织结构/COA_06">Cache</a>-<a href="/2020/12/27/计算机组织结构/COA_07">外存</a>-<a href="/2020/12/27/计算机组织结构/COA_08">纠错</a>-<a href="/2020/12/27/计算机组织结构/COA_09">RAID</a>-<a href="/2020/12/27/计算机组织结构/COA_10">内存管理</a>-<a href="/2020/12/27/计算机组织结构/COA_11">总线</a>-<a href="/2020/12/27/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2020/12/27/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}

## RAID

### 基本思想

使用多个磁盘, 分散的 I/O 请求, 以至于单一的 I/O 请求可以被并行处理, 只要请求的数据分散在不同的磁盘上.

### 特点

1. RAID 是被视为**一块逻辑磁盘**的一组物理磁盘.
1. 数据交叉分布在物理磁盘上.
1. 冗余的磁盘可用于存储奇偶校验信息, 以保证再磁盘故障的情况下的数据可恢复性.

## RAID 0

数据在可用的磁盘上**条带** (strip) 状排列, 如果数据跨物理磁盘, 则同时读写

不含冗余盘

**用途**:

+ 高速率数据传输
+ 高速 I/O 请求

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/5c640fb591dd2ac5f4fb02edd077ebdc49f6e700.jpg" style="zoom:67%;" />

与单个的大容量磁盘相比: 

​	**优点**: 若两个不同的 I/O 请求等待不同的两块数据, 如果这两块数据位于不同的物理磁盘, 就能加速.

​	**缺点**: 若数据跨盘, 只要其中的一块硬盘坏了, 所有的都不能读取.

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/b1cdc3c889a42b58f7db4790cdaadd03a1480418.jpg" style="zoom:67%;" />

## RAID 1

所有的数据都按 RAID 0 的方式存取, 只是每个数据都存两份 ( 镜像 ).

**优点**: 恢复很简单, 可以加速读取 ( 若两块硬盘中同时有这个数据 ).

**缺点**: 浪费, 性能会降低为较慢的盘.

**用途**: 仅用于存储系统文件, 数据和其他高度关键文件的驱动器.

与 RAID 0 相比:

+ 若请求的大部分是读取, RAID 1 可以实现较高的 I/O 请求率, 性能几乎是 RAID 0 的两倍.
+ 若大部分是写请求, 性能没有显著的优势.

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/cebac2dff8b13ac60b2d07856d55b1d8daee2029.jpg" style="zoom:67%;" />



## RAID 2 (未商业化)

使用**并行存取技术**(为一个客户服务):

+ 所有的成员磁盘参与 I/O 的运算,
+ 各自驱动器的轴是同步旋转的, 以便每个磁盘磁头的位置在同一时刻是相同的.

使用数据条带: 条带很小, 一个字节或者一个字.

**纠错机制**:

+ 每个磁盘相应位置计算校验码, 并存在多个校验盘的相应位置上.通常使用**汉明码**.
+ 读: 获取所请求的数据以及校验码.
+ 写: 必须访问所有的数据盘和校验盘.

**优点**: 

+ 高速率数据传输
+ 数据丢失可以恢复

缺点: 

+ I/O 响应慢,  同时只能处理一个 I/O
+ 成本过高, 因为磁盘可靠性已经得到了极大提高, 不容易出现大量错误

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/25f37c6b45723246e13639184a33eda269778c1a.jpg" style="zoom:67%;" />



## RAID 3

使用**并行存取技术**.

使用很小的条带

**纠错机制**:

+ 一个奇偶校验盘, 存有数据盘相同位置数据的奇偶校验码

+ 若有一个磁盘失效, 可以由其他磁盘和校验盘恢复出这个数据, 如 $b_0$ 失效:
  $$
  b_0 = P(b)\ \oplus b_1 \oplus b_2 \oplus b_3
  $$
  <img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/c14185b2896bf704dbdffd8eb15818f8a4ab3f5d.jpg" style="zoom:67%;" />

  

性能:

+ 高速率传输数据, 对大型传输改善尤为明显.
+ 一次只能执行一个 I/O 请求



## RAID 4(未实现商业化)

使用**独立访问技术**: 期望每个成员磁盘独立操作, 可以独立地并行完成 I/O 请求.

使用较大的数据条带

纠错机制: 每个数据盘上相应的条带上逐位计算奇偶校验带, 存储在奇偶校验盘的相应位置.

性能: 

+ 执行小规模 I/O 写请求时, RAID 4 遭受写损失

+ 每次写操作, 阵列管理软件不仅需要更新数据 , 还需要更新对应的奇偶校验码. 两读两写.
  $$
  P' = P \oplus b_0\oplus b_0'
  $$

+ 涉及大规模 I/O 写入, 仅根据新数据原数据和校验码就能得到新的校验码.

+ 冗余盘不能同时进行多个 I/O 操作, 成为写的瓶颈.

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/82cb8a6c55db2048f293916b87988b3e9e419f7e.jpg" style="zoom:67%;" />

## RAID 5

与 RAID 4 相类似, 但是没有专门的冗余盘, 而是分散到各个盘, 减少了 I/O 瓶颈.

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/baf3a2e585eaa2a9c04472f81049dc165ad591fc.jpg" style="zoom:67%;" />

## RAID 6

多一块磁盘, 两种纠错码相互印证.

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/329222880f592d912c0168da0ee8dd5d85a0c895.jpg" style="zoom:67%;" />

