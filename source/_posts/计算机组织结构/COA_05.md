---
title: "计算机组织结构(五) 内置存储器"
tag: ['底层','计组']
categories: 'NJU 笔记'
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2021/05/15/计算机组织结构/COA_00">合集</a>-<a href="/2021/05/15/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2021/05/15/计算机组织结构/COA_02">定点运算</a>-<a href="/2021/05/15/计算机组织结构/COA_03">BCD 码</a>-<a href="/2021/05/15/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2021/05/15/计算机组织结构/COA_05">内置存储器</a>-<a href="/2021/05/15/计算机组织结构/COA_06">Cache</a>-<a href="/2021/05/15/计算机组织结构/COA_07">外存</a>-<a href="/2021/05/15/计算机组织结构/COA_08">纠错</a>-<a href="/2021/05/15/计算机组织结构/COA_09">RAID</a>-<a href="/2021/05/15/计算机组织结构/COA_10">内存管理</a>-<a href="/2021/05/15/计算机组织结构/COA_11">总线</a>-<a href="/2021/05/15/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2021/05/15/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}

## Memory

存储器由一定数量的单元构成，每个单元可以被唯一标识，每个单元都有存储一个数值的能力.

+ 地址:单元的唯一标识符(采用二进制).
+ 地址空间:可唯一标识的单元总数.
+ 寻址能力: 存储在每个单元中的信息的位数
  + 大多数存储器是字节可寻址的,执行科学计算的计算机通常是64位寻址的.

## 半导体存储器

+ 主存中广泛地运用了半导体芯片.
+ **Memory Cell**:半导体主存的基本元素.
  + 特性:
    + 它们展示了两种稳定(半稳定)的状态,可以用于表示二进制0和1.
    + 能够被写入至少一次.
    + 可以被读.

## 半导体存储器类型

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/3ee2f36bb8d10c7aa8595477a7d7bc38efd76b3d.jpg" alt="半导体存储器类型" style="zoom:80%;" />

## RAM

### RAM

+ **Random-Access Memory**
+ **Characteristics**
  + 易于读/写且快速
  + 易失(断电丢失数据)
+ **类型**
  + DRAM:Dynamic RAM
  + SRAM:Static RAM

### DRAM

+ 以电容器上的电荷来存储数据
  + 电容器中是否存有电荷被解释称二进制1和0

+ 需要定期刷新来维持数据,因为电容器有放电的趋势
+ 本质是模拟设备,因为电容可以存储一定范围内的任何电荷值,因此需要使用一个阈值来确定保存的是1还是0.

<img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/3d8110ac2957078f247f7fc6725310962f39e43b.jpg" alt="DRAM" style="zoom:80%;" />
          

### SRAM

+ 用传统的触发逻辑门配置存储数据
  + 处理器中使用了相同的逻辑单元
+ 只要供应电力就能一直保存数据(无需刷新)
  <img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/83a86f458af7b30ca04aca27502cbe704f02e2be.jpg" alt="SRAM" style="zoom:80%;" />

### DRAM 和 SRAM 之间的比较

+ **相似点**:
  + 易失.必须持续供应电力来保存位值

+ **不同点**:
  + DRAM 比 SRAM 的单元更小且更简单,但是需要刷新电路
    + DRAM 比 SRAM 集成度更高,更便宜
    + DRAM 通常用于大内存需求
  + SRAM 通常比 DRAM 快
  + SRAM 用于 Cache DRAM 用于主存

### 高级DRAM 组织

+ **问题**
  传统的DRAM 芯片受限于其内部结构及其与处理器的存储总线的连接. 
+ **解决方案**:
  + SDRAM(Synchronous DRAM)
  + DDR (DDR SDRAM)

### SDRAM

+ 传统的 DRAM 是异步的.
  + 处理器将地址和控制信号提供给存储器,表示存储器中特定单元的一组数据应当被读出或写入DRAM.
  + 经过一段延时后,DRAM写入或读出数据.在这段时间内,DRAM 执行各种内部功能，如激活行地址线或列地址线的高电容， 读取数据，以及通过输出缓冲将数据输出,而处理器只是等待,降低了性能.
  + SDRAM 与处理器交换数据同步于外部时钟信号,可以以处理器/存储器总线全速运行,而不必等待.
  + 由于SDRAM随系统时钟移动数据,CPU 知道数据何时能够准备好.
    <img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/pqxwjrSud5agc4m.jpg" alt="SDRAM" style="zoom:67%;" />


### DDR SDRAM

+ Double-data-rate SDRAM双速率 SDRAM.
+ 每个时钟周期发送两次数据,一次在脉冲上升沿,一次在下降沿.
+ DDR 技术的更迭
  + 提升操作频率
  + 提升预取缓冲器位数
    <img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/3308197023c32a8fa15623c9601b5a9039fd8d96.webp" alt="DDR" style="zoom:67%;" />

## ROM

### Read-only memory

#### ROM

+ **只读存储器**
+ 特点
  + 不易失性:无需电源来维持数据.
  + 可读但不可写.
+ **应用**
  + 微程序设计，库子程序，系统程序,函数表.
+ **问题**
  + 固化数据需要较大的固定成本，不论是制造一片还是复制上千片特殊的ROM 。
  + 无出错处理机会，如果一位出错．则整批的ROM 芯片只能报废。

#### PROM

+ **Programmable ROM**
+ **特征**
  + 非易失性
  + 可以但只能写入一次
    + 用电信号写
    + 需要特殊设备
+ 与ROM相比
  + PROM 更灵活方便
  + ROM在大批量生产领域仍具有吸引力

### Read-mostly Memory

+ 特征
  + 读操作比写操作更为频繁
  + 非易失性存储
+ 类型
  + EPROM
  + EEPROM
  + Flash Memory

#### EPROM

+ **Erasable PROM**
+ **特点**
  + 用电信号读写
  + 擦除:在写入新的数据之前,用紫外线辐射芯片
    + 所有的存储位元都还原为初始状态
    + 需要20分钟
+ 与 PROM 相比
  + EPROM更贵,但可以多次改写

#### EEPROM

+ **Electrical EPROM**
+ **特点**
  + 任何时候都可以写入,无需擦除原有数据
  + 只需要更新寻址到的一个或者多个字节
  + 写操作耗费时间更长,每个字节需要几百微秒

+ 与 EPROM 相比
  + EEPROM 更加昂贵,且密度更小,适合小容量芯片

#### Flash Memory

+ **特点**
  + 电擦除
  + 擦除至多需要数秒,比 EPROM 要快得多
  + 可以擦除存储器中的某些块,但不能提供字节级擦除
  + 相较于 EEPROM ,闪存与EPROM有一样的高存储密度


## 芯片逻辑

+ **可寻址单元**
  + 由拥有相同地址的**存储位元**(memory cell)组成
+ **寻址模式**
  + 字节可寻址
  + 字
+ **存储阵列**(Memory array)
  + 由许多存储单元组成(如下图中有$2048\times 2048$个存储单元)
    <img src="https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/README.assets/7efdd71a9827da9b5f3a4d6854acdea6ecdc13a3.webp" alt="RAM" style="zoom:67%;" />

## 刷新(Refreshing)

+ 集中式刷新
  + 停止读写操作,刷新每一行.
  + 当刷新时存储器不能进行操作
+ 分散式刷新
  + 在每一个存储周期内当读写操作完成后对一部分刷新
  + 增加了存储的时间
+ 异步刷新
  + 64ms 内对每一行刷新完毕,每行刷新间隔不变
  + 效率高

## 字扩展,位扩展和字位扩展

+ 字扩展
  + **增加了存储器中字的个数**,地址线增加,数据线不变.由**片选信号**来区分各芯片的地址范围.
+ 位扩展
  + 增加了字长.地址线不变,数据线增加.读写的时候,一个地址对应几块芯片的同一位置.
+ 字位扩展
  + 二者结合

