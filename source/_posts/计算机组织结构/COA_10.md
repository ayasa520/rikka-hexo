---
title: "计算机组织结构(十) 内存管理"
tag: ['底层','计组']
categories: 'NJU 笔记'
date: 2020-12-27
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2020/12/27/计算机组织结构/COA_00">合集</a>-<a href="/2020/12/27/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2020/12/27/计算机组织结构/COA_02">定点运算</a>-<a href="/2020/12/27/计算机组织结构/COA_03">BCD 码</a>-<a href="/2020/12/27/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2020/12/27/计算机组织结构/COA_05">内置存储器</a>-<a href="/2020/12/27/计算机组织结构/COA_06">Cache</a>-<a href="/2020/12/27/计算机组织结构/COA_07">外存</a>-<a href="/2020/12/27/计算机组织结构/COA_08">纠错</a>-<a href="/2020/12/27/计算机组织结构/COA_09">RAID</a>-<a href="/2020/12/27/计算机组织结构/COA_10">内存管理</a>-<a href="/2020/12/27/计算机组织结构/COA_11">总线</a>-<a href="/2020/12/27/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2020/12/27/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}


过去, 只有操作系统和一个程序在内存中.

现在, 操作系统和多个程序都在内存中. 程序等待 I/O 时, 为了避免处理器等待, 需要进行优化, 使得更多的程序可以加载入内存.

**内存管理:** 在多程序设计系统中, 内存的 "用户部分" 应该被进一步划分以适应多个程序, 这是由系统动态决定的.

## 加载更多程序的途径

+ 增大内存	

+ 使用交换和重叠技术

  + 当没有程序就绪的时候, 系统载入程序

  + **分区**和**分页**

+ 虚拟内存

  + 请求分页
  + 虚拟地址

## 分区

### 固定大小分区

系统: 固定的大小

用户程序: 固定的大小, 但各不相同. 当加载一个程序的时候, 将其载入刚好能够容纳下这个程序的最小的区中.

缺点: 产生大量内部碎片.

<img src="data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAFLCAYAAAD1UT8LAAAH8HRFWHRteGZpbGUAJTNDbXhmaWxlJTIwaG9zdCUzRCUyMjg5NzgzZWM2LWE1YTAtNDU3MC1iZjJlLTc3NTExYTYwMzBlMCUyMiUyMG1vZGlmaWVkJTNEJTIyMjAyMC0xMi0xM1QxNyUzQTIwJTNBNDkuMzE5WiUyMiUyMGFnZW50JTNEJTIyNS4wJTIwKFdpbmRvd3MlMjBOVCUyMDEwLjAlM0IlMjBXaW42NCUzQiUyMHg2NCklMjBBcHBsZVdlYktpdCUyRjUzNy4zNiUyMChLSFRNTCUyQyUyMGxpa2UlMjBHZWNrbyklMjBDb2RlJTJGMS41MS4xJTIwQ2hyb21lJTJGODMuMC40MTAzLjEyMiUyMEVsZWN0cm9uJTJGOS4zLjMlMjBTYWZhcmklMkY1MzcuMzYlMjIlMjB2ZXJzaW9uJTNEJTIyMTMuMTAuMCUyMiUyMGV0YWclM0QlMjJ4STNoWTM1V19zQkpFekZiRFZ3NCUyMiUyMHR5cGUlM0QlMjJlbWJlZCUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMjlrUXY2NDRzaXYwYjJoX05FMVpjJTIyJTIwbmFtZSUzRCUyMlBhZ2UtMSUyMiUzRSUzQ214R3JhcGhNb2RlbCUyMGR4JTNEJTIyNDU4JTIyJTIwZHklM0QlMjI4MjklMjIlMjBncmlkJTNEJTIyMSUyMiUyMGdyaWRTaXplJTNEJTIyMTAlMjIlMjBndWlkZXMlM0QlMjIxJTIyJTIwdG9vbHRpcHMlM0QlMjIxJTIyJTIwY29ubmVjdCUzRCUyMjElMjIlMjBhcnJvd3MlM0QlMjIxJTIyJTIwZm9sZCUzRCUyMjElMjIlMjBwYWdlJTNEJTIyMSUyMiUyMHBhZ2VTY2FsZSUzRCUyMjElMjIlMjBwYWdlV2lkdGglM0QlMjI4MjclMjIlMjBwYWdlSGVpZ2h0JTNEJTIyMTE2OSUyMiUyMG1hdGglM0QlMjIwJTIyJTIwc2hhZG93JTNEJTIyMCUyMiUzRSUzQ3Jvb3QlM0UlM0NteENlbGwlMjBpZCUzRCUyMjAlMjIlMkYlM0UlM0NteENlbGwlMjBpZCUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjIwJTIyJTJGJTNFJTNDbXhDZWxsJTIwaWQlM0QlMjIzJTIyJTIwdmFsdWUlM0QlMjJPUyUyMiUyMHN0eWxlJTNEJTIycm91bmRlZCUzRDAlM0J3aGl0ZVNwYWNlJTNEd3JhcCUzQmh0bWwlM0QxJTNCJTIyJTIwdmVydGV4JTNEJTIyMSUyMiUyMHBhcmVudCUzRCUyMjElMjIlM0UlM0NteEdlb21ldHJ5JTIweCUzRCUyMjE2MCUyMiUyMHklM0QlMjIzNjAlMjIlMjB3aWR0aCUzRCUyMjEyMCUyMiUyMGhlaWdodCUzRCUyMjQwJTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUyRiUzRSUzQyUyRm14Q2VsbCUzRSUzQ214Q2VsbCUyMGlkJTNEJTIyNCUyMiUyMHZhbHVlJTNEJTIyNjRLJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMCUzQndoaXRlU3BhY2UlM0R3cmFwJTNCaHRtbCUzRDElM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyMSUyMiUzRSUzQ214R2VvbWV0cnklMjB4JTNEJTIyMTYwJTIyJTIweSUzRCUyMjQwMCUyMiUyMHdpZHRoJTNEJTIyMTIwJTIyJTIwaGVpZ2h0JTNEJTIyNDAlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTJGJTNFJTNDJTJGbXhDZWxsJTNFJTNDbXhDZWxsJTIwaWQlM0QlMjI1JTIyJTIwdmFsdWUlM0QlMjIxMjhLJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMCUzQndoaXRlU3BhY2UlM0R3cmFwJTNCaHRtbCUzRDElM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyMSUyMiUzRSUzQ214R2VvbWV0cnklMjB4JTNEJTIyMTYwJTIyJTIweSUzRCUyMjQ0MCUyMiUyMHdpZHRoJTNEJTIyMTIwJTIyJTIwaGVpZ2h0JTNEJTIyODAlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTJGJTNFJTNDJTJGbXhDZWxsJTNFJTNDbXhDZWxsJTIwaWQlM0QlMjI2JTIyJTIwdmFsdWUlM0QlMjIyNTZLJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNE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" style="cursor:pointer;max-width:100%;" onclick="(function(img){if(img.wnd!=null&&!img.wnd.closed){img.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&&evt.source==img.wnd){img.wnd.postMessage(decodeURIComponent(img.getAttribute('src')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);img.wnd=window.open('https://viewer.diagrams.net/?client=1&page=0&edit=_blank');}})(this);"/>

### 可变大小分区

系统: 固定的大小

用户程序: 按需分配

缺点: 产生大量外部碎片

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/03a8d63fbcb773d9b684288d894255ee5fa00838.webp" style="zoom:67%;" />

## 分页

基本思想:

+ 将内存分为固定大小的块, 称为**页框**(页帧), 将程序分为固定大小的块, 称为**页**

+ 将页加载入页框中

**逻辑地址:** 指令中的地址

**物理地址:**主存中的地址

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/cadfd03860469d165472ec6279b4aed1e349eea9.webp" style="zoom: 67%;" />

## 虚拟内存

内存的大小是有限的，但是对内存的需求在不断增加

**基本思想：**请求分页，一个进程的页只有在需要的时候才被调入

本质：

+ 在比内存大的逻辑地址空间中编程
+ 只调入需要的程序和数据
+ 通过硬件将逻辑地址转化为物理地址
+ 当发生页缺失的时候在内存和硬盘之间交换信息

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/a234581cc2a822f4f6f02684b41da95ca8950d73.webp" style="zoom:80%;" />

### 一些问题

+ 页的大小: 4KB, 8Kb...
+ 映射函数: 关联映射
+ 类型:
  + 基于页的虚拟内存
  + 基于段的虚拟存储器
  + 基于段和页的虚拟内存
+ 写策略: 写回

### 基于页的虚拟内存

将主存和虚拟内存分成相同大小的页

+ 虚页(Virtual page)/逻辑页(Logical page): 虚拟内存中的页
+ 物理页(Physical page)/页框(page frame): 主存中的页

页表:

+ 包含着所有虚页的信息, 包括位置, 有效位, 脏位, 可读写位
+ 存储在主存中
+ 虚拟地址 $<-$ 虚页号 + 页内地址 (偏移量)

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/37719366f70bb69d22383fce2f2e421fe635940a.webp" alt="页表" style="zoom:67%;" />

### 快表 (TLB)

页表的使用增加了主存的访问

为了减少访问主存, 将最常用的页表项加载进 cache

**TLB:** 页表项被载入 cache 

+ 全相联映射, 组关联映射
+ 随机替换策略

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/66ee27fdf8bb2574adf0f46387f468218d6602ca.webp" style="zoom:67%;" />

| No.  | TLB            | page table | cache | possibility                         |      |
| ---- | -------------- | ---------- | ----- | ----------------------------------- | ---- |
| 1    | hit \| valid   | ---------  | hit   | possible, in cache                  |      |
| 2    | hit \| invalid | ---------  | hit   | impossible                          |      |
| 3    | hit \| invalid | ---------  | miss  | impossible                          |      |
| 4    | hit \| valid   | ---------  | miss  | possible, in memory bu not in cache |      |
| 5    | miss           | valid      | hit   | possible, in cache                  |      |
| 6    | miss           | invalid    | hit   | impossible                          |      |
| 7    | miss           | valid      | miss  | possible, in memory bu not in cache |      |
| 8    | miss           | invalid    | miss  | possible, not in memory             |      |

ps: 快表中只有 valid 情况下才能算 hit

分析: 

+ 最好: 1,	未访问内存
+ 好      4, 5 只访问一次内存  
+ 坏      7      两次访问主存
+ 最坏   8      两次访问主存, 并访问硬盘

### 基于段的虚拟存储器

将程序和数据分成不同长度的段, 并将需要的段载入主存

**虚拟地址**: 段号 + 段内偏移量

与基于页的虚拟内存相比:

+ 基于页的虚拟内存
  + 优势: 简单, 成本低
    + 劣势:指令和数据可能跨页
+ 基于段的虚拟内存
  + 优势: 数据和程序自然划分
  + 劣势: 长度并非固定

### 基于段和页的虚拟内存

将程序和数据划分为段, 并进一步将段划分为页, 每一个段都有它自己页表

**虚拟地址**: 段号 + 页号 + 偏移量

优势: 程序在段中可以共享和保护

劣势: 需要多次查表

## 补充 PA 中的内存管理部分

### 实模式

#### **8086的实模式**

+ 寄存器长度：16 位
  + 访问内存需要结合**段寄存器**(segment register)进行
+ 地址线：20 根
+ 物理地址计算方式
  + physical address = (seg_reg<<4)+offset，offset 为 16 位的偏移量
  + 可寻址空间：$2^{20}$=1MB

#### 分段机制

x86 的机器开机后首先进入实模式

+ 加载操作系统
+ 操作系统初始化段表
+ 拨动一个"开关", 从实模式切换到保护模式

进入保护模式后

+ 程序给出 48 位逻辑地址(16位段选择符 + 32 位有效地址)
+ 使用段选择符来查段表
+ 进行段级地址转换得到线性地址

#### 分段机制(地址转换)

80386 保护模式下的地址转换

+ 逻辑地址到线性地址的转换

  + **逻辑地址**: 48 位, 又叫虚拟地址,其中

    **段选择符**: 16 位(sreg对应的段寄存器的内容)

    **段内偏移量**(有效地址): 32 位(vaddr给出的32位地址)

    

  <img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/a251a56b74772c80ebcd9fc2ea7361bc26c6ab9c.webp" style="zoom:67%;" />





