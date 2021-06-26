---
title: "计算机组织结构(十二) 指令集: 特征"
tag: ['底层','计组']
categories: 'NJU 笔记'
date: 2020-12-27
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2020/12/27/计算机组织结构/COA_00">合集</a>-<a href="/2020/12/27/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2020/12/27/计算机组织结构/COA_02">定点运算</a>-<a href="/2020/12/27/计算机组织结构/COA_03">BCD 码</a>-<a href="/2020/12/27/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2020/12/27/计算机组织结构/COA_05">内置存储器</a>-<a href="/2020/12/27/计算机组织结构/COA_06">Cache</a>-<a href="/2020/12/27/计算机组织结构/COA_07">外存</a>-<a href="/2020/12/27/计算机组织结构/COA_08">纠错</a>-<a href="/2020/12/27/计算机组织结构/COA_09">RAID</a>-<a href="/2020/12/27/计算机组织结构/COA_10">内存管理</a>-<a href="/2020/12/27/计算机组织结构/COA_11">总线</a>-<a href="/2020/12/27/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2020/12/27/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}


## 机器指令特征

CPU 的操作由它所执行的指令确定, 这些指令被称为**机器指令**. CPU 能执行的各种不同指令的集合称为 CPU 的**指令集**

### 指令周期

指令周期: 指单条指令所需的处理过程

+ 取指令: 每次从内存中取一条指令
+ 执行指令: 执行每条指令

只有关机时, 程序执行才会停止, 或者遇到致命错误或者停止计算机的指令.

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/image (1).jpg" style="zoom:80%;" />

指令周期状态图:

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/image (1).jpg" style="zoom:80%;" />

### 带有中断的指令周期

带有中断的指令周期:

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/image.jpg" style="zoom:80%;" />

带有中断的指令周期状态图:

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/image.jpg" style="zoom:80%;" />



### 机器指令要素

+ **操作码:**指定要执行的操作 

+ **源操作数引用:**操作会涉及一个或多个源操作数， 这是操作所需的输入

+ **结果操作数引用:**该操作可能产生一个结果

+ **下一指令引用:**它告诉处理器这条指令执行完成后到哪儿去取下一条指令

  

### 指令表示

+ 每条指令都由一个位序列表示
+ 指令格式:指令被划分为字段，对应于指令的要素
+ 对于大多数指令集，使用一种以上的格式

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/image (1).jpg" style="zoom:80%;" />

+ 符号表示:帮助程序员和教科书的读者处理指令
+ 操作码用缩写表示，称为助记符
+ ADD: ADD, SUB: subtract, MUL: multiply, DIV: divide，
+ LOAD:从内存加载数据，STOR:将数据存储到内存
+ 操作数也用符号表示
+ 用寄存器名或内存地址替换操作数



### 指令类型



+ **数据处理**:算数和逻辑指令
+ **数据存储**: 存储器指令
+ **数据传送:**I/O指令
+ **控制:** 测试和分支(branch)能力

## 操作类型

+ Data transfer
+ Arithmetic
+ Logical
+ Conversion
+ I/O
+ System control
+ Transfer of control

## 操作数类型

+ 地址
+ 数字
+ 字符
+ 逻辑(布尔)量



