---
title: "计算机组织结构(十三) 指令集:寻址方式和指令格式"
tag: ['底层','计组']
categories: 'NJU 笔记'
date: 2020-12-27
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2020/12/27/计算机组织结构/COA_00">合集</a>-<a href="/2020/12/27/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2020/12/27/计算机组织结构/COA_02">定点运算</a><a href="/2020/12/27/计算机组织结构/COA_03">BCD 码</a>-<a href="/2020/12/27/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2020/12/27/计算机组织结构/COA_05">内置存储器</a>-<a href="/2020/12/27/计算机组织结构/COA_06">Cache</a>-<a href="/2020/12/27/计算机组织结构/COA_07">外存</a>-<a href="/2020/12/27/计算机组织结构/COA_08">纠错</a>-<a href="/2020/12/27/计算机组织结构/COA_09">RAID</a>-<a href="/2020/12/27/计算机组织结构/COA_10">内存管理</a>-<a href="/2020/12/27/计算机组织结构/COA_11">总线</a>-<a href="/2020/12/27/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2020/12/27/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}



表示:

+ A: 指令中地址字段的内容
+ R: 指向寄存器的指令字段的内容
+ EA: 被访问未知的实际(有效)地址
+ (X): 存储器位置 X 或者寄存器 X 的内容

## 立即寻址 (Immediate Addressing)

操作数存在于指令中:

<center>操作数 = A</center>

应用: 定义和使用常数, 或者设置变量的初始值.

优点: 获取操作书不需要访问存储器, 只获取指令

缺点: 数字的大小被限制为地址字段的大小

![](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/COA_13.assets/image%20(2).jpg)

## 直接寻址 (Direct Addressing)

地址字段包含着操作数的有效地址, 早期计算机常见

<center>
    EA = A
</center>

优点: 只有一次存储器访问, 不需要进行专门计算

缺点: 只能提供有限的地址空间

![](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/COA_13.assets/8ff6aaf8a8134196fe5e560e0b8b8105b51e453a.jpg)

## 间接寻址(Indirect Addressing)

指令中地址字段只是一个存储器字地址, 而这个地址保存着操作数的全长度地址

<center>
    EA = (A)
</center>


优点: 扩大了寻址空间

缺点: 需要访问两次内存来获取操作数

评价: 一次能够引用的不同地址数存在限制

![](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/COA_13.assets/image (2).jpg)

### 寄存器寻址 (Register Addressing)

类似直接寻址, 地址字段指的时寄存器而不是一个主存地址.

<center>
    EA = R
</center>




优点: 指令中只需要一个很小的地址字段用来指向寄存器, 不需要访问内存

缺点: 寻址空间极其有限

注意: 只有寄存器得到了有效的使用才有意义

![](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/COA_13.assets/image.jpg)

### 寄存器间接寻址(Register Indirect Addressing)

地址的字段指向一个寄存器

<center>
    EA = (R)
</center>


优点: 扩大了寻址空间, 比间接寻址少访问一次主存

劣势: ?

![](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/COA_13.assets/image (1).jpg)

### 偏移寻址(Displacement Addressing)

结合直接寻址和间接寻址

<center>
    EA = (R) + A
</center>


指令中有两条地址字段, 其中至少一个是显性的. 其中一个地址字段(val = A) 被直接使用, 另一个地址字段指向寄存器. 寄存器的内容加上 A 产生有效地址.

三种偏移寻址:

1.**相对寻址**

隐式引用的寄存器时程序计数器`PC`, 即当前 PC 的值 (为现执行指令的下一条指令的地址), 加上地址字段的值(A, 通常为补码整数), 得到有效地址

<center>
    EA = (PC) + A
</center>


优点: 利用了程序局部性的概念, 并在指令中保存了地址位.

用途: 子程序跳转?

2.**基址寄存器寻址**

引用的寄存器含有一个主存地址, 地址字段含有一个相对于那个地址的偏移量(usually unsigned)

可以是显式引用, 也可以是隐式引用

<center>
    EA = (R) +A
</center>


3.**变址**

地址字段引用一个主存地址, 被引用的寄存器对于那个地址有一个正的偏移量

<center>
    EA = A+(R)
</center>

用法: 高效完成重复操作, 将值 A 存入指令的地址字段, 选取一个寄存器作为变址寄存器, 初始化为0, 每次操作之后, 变址寄存器加1

扩展:结合间接寻址和变址:

+ 后变址: 间接寻址之后变址

  <center>
      EA = (A) + (R)
  </center>

+ 前变址: 变址在间接寻址之前

  <center>
      EA = (A+(R))
  </center>

### 栈寻址

栈指针维护在寄存器中, 所以对内存栈位置的访问实际上是一种寄存器间接寻址方式.

注意: 与栈相关的是一个指针, 它的值可能是栈顶地址或者第三个元素的地址(前两个可能已经进入寄存器)

## 指令格式

指令长度, 位分配, 可变长度指令

