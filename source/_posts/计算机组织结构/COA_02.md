---
title: "计算机组织结构(二) 定点运算"
tag: ['底层','计组']
categories: 'NJU 笔记'
date: 2020-12-27
---

{% note blue ' fas fa-rocket' modern %}
📚 文档目录
<a href="/2020/12/27/计算机组织结构/COA_00">合集</a>-<a href="/2020/12/27/计算机组织结构/COA_01">数的二进制表示</a>-<a href="/2020/12/27/计算机组织结构/COA_02">定点运算</a>-<a href="/2020/12/27/计算机组织结构/COA_03">BCD 码</a>-<a href="/2020/12/27/计算机组织结构/COA_04">浮点数四则运算</a>-<a href="/2020/12/27/计算机组织结构/COA_05">内置存储器</a>-<a href="/2020/12/27/计算机组织结构/COA_06">Cache</a>-<a href="/2020/12/27/计算机组织结构/COA_07">外存</a>-<a href="/2020/12/27/计算机组织结构/COA_08">纠错</a>-<a href="/2020/12/27/计算机组织结构/COA_09">RAID</a>-<a href="/2020/12/27/计算机组织结构/COA_10">内存管理</a>-<a href="/2020/12/27/计算机组织结构/COA_11">总线</a>-<a href="/2020/12/27/计算机组织结构/COA_12">指令集: 特征</a>-<a href="/2020/12/27/计算机组织结构/COA_13"> 指令集:寻址方式和指令格式</a>
{% endnote %}


## 1. 移位运算

### 1.算数移位

+ **符号位不变**, 左移相当于乘以 2, 右移相当于除以 2(左侧全补符号位).

### 2. 逻辑移位

+ **无符号数的移位**, 右移时永远在高位填 0.

## 2. 加法运算

### 1. 全加器

+ $𝑆_𝑖=𝑋_𝑖⊕𝑌_𝑖⊕𝐶_{𝑖−1}$
+ $𝐶_𝑖=𝑋_𝑖𝐶_{𝑖−1}+𝑌_𝑖𝐶_{𝑖−1}+𝑋_𝑖𝑌_𝑖$

### 2. Serial Carry Adder

<iframe frameborder="0" style="width:100%;height:200%;" src="https://app.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#R7VpLc9owEP41HJvxS9g%2BJpC0h3amMxxKjipWsDrGYmwRIL%2B%2BMpZfWiAE%2FMAMF8ZaybL0fatvd20G5mix%2BR7hpf%2BLeSQYGJq3GZjjgWG4riF%2BE8M2NdjITA3ziHqpSS8ME%2FpBpFGT1hX1SFwZyBkLOF1WjTMWhmTGKzYcRWxdHfbGgupTl3hOgGEywwG0%2FqEe91OrY9iF%2FQehcz97sj50054FzgbLncQ%2B9ti6ZDKfB%2BYoYoynV4vNiAQJdhku6X0vB3rzhUUk5KfcYMslx3ybbY54Yq%2ByySLuszkLcfBcWJ8itgo9ksygiVYx5idjS2HUhfEf4XwricMrzoTJ54tA9pIN5VN5e3L9mlw%2FINkab0pd461spOtMFndwq9IUs1U0k6NsPQdVOCNhC8KjrRgTkQBz%2Bl6dC0u3mOfj8lt%2FMyqeYmjSgy1T8icdWM%2Fa2RQcR3PC5V0F%2FuKitIzCtGNlP0Ou3gVDV4U2UtA2GgPblmt7x8FKrvblEeC%2F9iknkyXebXstFK6KHY6Xqei80U3CgQTznUScbI7DCaHLHM6tQpA11yX5kSa%2FpDyOdhjrCkzHMDEAJtAjQ%2B8x0VXRmgU4julMOfCheOi03Cgd%2BaRZnPld6%2BuHPvWB425YAgvtASuzXeitw%2BEn2pCeGOCu0O3VifTm%2FN4EHI80wLJwX664ekDnYUK6oINEwpA4ORWB8lF2LKjnpYpEYvqB%2F%2B6mSphdJqve7QM9DdA4mUuIUJzqkV7PoRlqCoCaDU6NuccRVH0569S4PZJttOcMDS%2BU8lOBcrrJQNoVJNRMFqKfl4WAiUz7PMkSmo%2B3pWHyUF%2BoRehKY7BhdRaDHbNHanKpchxw9tYy7nQDV%2BiAutadA2owQYCFSd8SBAt1lyA4FkQ07D2iQ6c7QB0AKBTNok4JWZiA5OHY32mkfp72dVVlmE5NVUaLrzIc90sMHa8ktQcjT9Zey503VEoiJcHLg%2BCXS0k1etqNkezCSHF9JHdGKKqLUDVyNUioAQid9D%2F0q%2B8UEcylmgpULnzZMu0%2FoJaL9rt2G4jCXOq1%2F4gis0NEERTt6yk4ay8uDSWbOvELw6fzuKfJ%2BzmqDIvUe5jNaRjWFGbViZoMs%2Fad0MPVjlYToepETRIK69FJ%2BK3%2FYcmwrQqEezInq6moBAvI6U1Aah1w7xYwzV8qlpOnmwBVjemtgnrV%2F9qoPX%2FSVQc%2BM39S52kuf9I1WNbe423Og1FTvFUnajDe6hqsq%2B%2BM5kTUlRKrEzXKKKzrJ%2F3%2FRqKKXIuvnnQNflyf3gCih8qDViCFlfjrDUB6QkpaE6SiWfzhOZWJ4l%2Fj5vN%2F"></iframe>

+ 缺点: 速度慢.
+ 延时(OR AND 1ty, XOR 3ty)
  + Cn: 2n ty
  + Sn: 2n+1 ty

### 3. Carry Look Ahead Adder

**注意**：这里的+均为“或”
$$
\begin{aligned}
𝐶_𝑖&=𝑋_𝑖𝐶_{𝑖−1}+𝑌_𝑖𝐶_{𝑖−1}+𝑋_𝑖𝑌_i\\
\\
C_1&=𝑋_1𝑌_1+(𝑋_1+𝑌_1)𝐶_0\\
𝐶_2&=𝑋_2𝑌_2+(𝑋_2+𝑌_2)𝑋_1𝑌_1+(𝑋_2+𝑌_2)(𝑋_1+𝑌_1)𝐶_0\\
𝐶_3&=𝑋_3𝑌_3+𝑋_3+𝑌_3𝑋_2𝑌_2+𝑋_3+𝑌_3𝑋_2+𝑌_2𝑋_1𝑌_1
+(𝑋_3+𝑌_3)(𝑋_2+𝑌_2)(𝑋_1+𝑌_1)𝐶_0\\
C_4 &=...
\end{aligned}
$$

可见,$Ci$ 仅与最初的X Y和 $C_0$有关.
令$𝑃_𝑖=𝑋_𝑖+𝑌_𝑖, 𝐺_𝑖=𝑋_𝑖𝑌_i$
则:
$$
\begin{aligned}
\\
𝐶_1&=𝐺_1+𝑃_1𝐶_0\\
𝐶_2&=𝐺_2+𝑃_2𝐺_1+𝑃_2𝑃_1𝐶_0\\
𝐶_3&=𝐺_3+𝑃_3𝐺_2+𝑃_3𝑃_2𝐺_1+𝑃_3𝑃_2𝑃_1𝐶_0\\
𝐶_4&=...
\end{aligned}
$$
总结得:$C_{i+1} = G_{i+1}+P_{i+1}C_i$, 超前进位加法器采用的是将低一位的逻辑代数代入高一位, 依此类推最终每一个进位输出仅考虑 $C_0, X_i, Y_i$几个信号, 于是所有的进位都能同时计算.

+ 缺点:复杂
+ 延时: 1 ty+ 2ty + 3 ty = 6 ty

### 4. Partial Carry Look Ahead Adder

   结合两者  

### 5. 溢出判断

+ $C_n\oplus C_{n-1} =1$, 即符号位进位与最高有效位进位不同时,发生溢出.
+ $𝑋_𝑛 𝑌_𝑛 \overline{𝑆_𝑛}+\overline{𝑋_𝑛𝑌_𝑛}𝑆_𝑛=1$,则溢出,与上面等价.

### 3. 减法运算

减法运算大致与加法相同,只需要将减数取反加一然后按加法算即可, **注意加一的操作是令 $C_0 = 1$**.

### 4. 乘法运算

#### 1. 无符号整数乘法

通过**加法和移位实现**,与竖式乘法极其类似,但是计算机很难像人类那样一次性把各位乘的结果一次性相加,因此采用部分积的方式:
例:$0111\times0110$

| <font color=#FF0000>部分积</font> |              乘数               |       得到当前行的操作       |
| :-------------------------------: | :-----------------------------: | :--------------------------: |
|  <font color=#FF0000>0000</font>  |              0110               | 部分积+乘数末位$\times 0111$ |
|  <font color=#FF0000>0000</font>  | <font color=#FF0000>0</font>011 |             右移             |
|  <font color=#FF0000>0111</font>  | <font color=#FF0000>0</font>011 | 部分积+乘数末位$\times 0111$ |
|  <font color=#FF0000>0011</font>  | <font color=#FF0000>10</font>01 |             右移             |
|  <font color=#FF0000>1010</font>  | <font color=#FF0000>10</font>01 | 部分积+乘数末位$\times 0111$ |
|  <font color=#FF0000>0101</font>  | <font color=#FF0000>010</font>0 |             右移             |
|  <font color=#FF0000>0101</font>  | <font color=#FF0000>010</font>0 | 部分积+乘数末位$\times 0111$ |
|  <font color=#FF0000>0010</font>  | <font color=#FF0000>1010</font> |             右移             |

+ 乘数末位决定被乘数是否加到部分积,然后部分积和乘数均**右移**,部分积低位保存到乘数高位.
+ **被乘数只与部分积高位相加**

原理:
$$\begin{aligned}
XY &= XY_nY_{n-1}...Y_2Y_1\\&=X(Y_n\times2^{n-1}+Y_n\times2^{n-2}+...+Y_2\times2^1+Y_1\times2^0)\\&=2^n(XY_n\times2^{-1}+XY_{n-1}\times2^{-2}+...+XY_1\times2^{-n})\\
&=2^nP_{n},其中P_{n} = 2^{-1}\times(XY_{n}+P_{n-1}),n\gt1.\end{aligned}$$

#### 2. 补码整数乘法

根据上面无符号整数的原理, 可以将二进制补码整数相乘变形如下:

$$\begin{aligned}XY& = XY_nY_{n-1}...Y_2Y_1\\&=X(-Y_n\times2^{n-1}+Y_n\times2^{n-2}+...+Y_2\times2^1+Y_1\times2^0)\\&=2^nX((Y_{n-1}-Y_n)\times2^{-1}+(Y_{n-2}-Y_{n-1})\times2^{-2}+...+(Y_0-Y_1)\times2^{-n})\\&
=2^nP_{n},其中Y_0=0,P_{n} = 2^{-1}\times(X(Y_{n-1}-Y_{n})+P_{n-1}),n\gt1.\end{aligned}$$

形式上还原了,只是每次乘的**不是乘数的末位数**, 且注意是**算数右移**,需要补符号位,
例: $-7\times-6 = 42,即 1001\times1010=00101010$

| <font color=#FF0000>部分积</font> |               乘数               |       得到当前行的操作        |
| :-------------------------------: | :------------------------------: | :---------------------------: |
|  <font color=#FF0000>0000</font>  | 1010<font color=#0000FF>0</font> | 部分积+$(Y_0-Y_1)\times 1001$ |
|  <font color=#FF0000>0000</font>  | <font color=#FF0000>0</font>1010 |             右移              |
|  <font color=#FF0000>0111</font>  | <font color=#FF0000>0</font>1010 | 部分积+$(Y_1-Y_2)\times 1001$ |
|  <font color=#FF0000>0011</font>  | <font color=#FF0000>10</font>101 |             右移              |
|  <font color=#FF0000>1100</font>  | <font color=#FF0000>10</font>101 | 部分积+$(Y_2-Y_3)\times 1001$ |
|  <font color=#FF0000>1110</font>  | <font color=#FF0000>010</font>10 |             右移              |
|  <font color=#FF0000>0101</font>  | <font color=#FF0000>010</font>10 | 部分积+$(Y_3-Y_4)\times 1001$ |
|  <font color=#FF0000>0010</font>  | <font color=#FF0000>1010</font>1 |             右移              |

### 5. 除法运算

#### 1. unsigned

1.人的计算:除数右移, 2n位

+ 竖式计算:
  <img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/8216b980b855f3139a28932f6883a053a6e04f1f.webp" style="zoom:50%;" />

|   余数   |   <font color=#0000FF>除数</font>   |               商                |
| :------: | :---------------------------------: | :-----------------------------: |
| 00000111 | <font color=#0000FF>00110000</font> |              0000               |
| 00000111 | 0<font color=#0000FF>0011000</font> |              0000               |
| 00000111 | 0<font color=#0000FF>0011000</font> | 000<font color=#FF0000>0</font> |
| 00000111 | 00<font color=#0000FF>001100</font> | 000<font color=#FF0000>0</font> |
| 00000111 | 00<font color=#0000FF>001100</font> | 00<font color=#FF0000>00</font> |
| 00000111 | 000<font color=#0000FF>00110</font> | 00<font color=#FF0000>00</font> |
| 00000001 | 000<font color=#0000FF>00110</font> | 0<font color=#FF0000>001</font> |
| 00000001 | 0000<font color=#0000FF>0011</font> | 0<font color=#FF0000>001</font> |
| 00000001 | 0000<font color=#0000FF>0011</font> | <font color=#FF0000>0010</font> |

1. 计算机的计算: **余数左移**, n位

| <font color=#0000FF>余数</font> |               <font color=#FF0000>商</font>                | 除数 |
| :-----------------------------: | :--------------------------------------------------------: | :--: |
| <font color=#0000FF>0000</font> |              <font color=#0000FF>0111</font>               | 0011 |
| <font color=#0000FF>0000</font> |               <font color=#0000FF>111</font>               | 0011 |
| <font color=#0000FF>0000</font> | <font color=#0000FF>111</font><font color=#FF0000>0</font> | 0011 |
| <font color=#0000FF>0001</font> | <font color=#0000FF>11</font><font color=#FF0000>0</font>  | 0011 |
| <font color=#0000FF>0001</font> | <font color=#0000FF>11</font><font color=#FF0000>00</font> | 0011 |
| <font color=#0000FF>0011</font> | <font color=#0000FF>1</font><font color=#FF0000>00</font>  | 0011 |
| <font color=#0000FF>0000</font> | <font color=#0000FF>1</font><font color=#FF0000>001</font> | 0011 |
| <font color=#0000FF>0001</font> |               <font color=#FF0000>001</font>               | 0011 |
| <font color=#0000FF>0001</font> |              <font color=#FF0000>0010</font>               | 0011 |

#### 2. 带有符号的除法

+ 如何判断余数(的绝对值)是否大于除数(的绝对值)?
  + 同号则减, 异号则加. 与结果符号相同的那个数绝对值大

<table style="border-collapse:collapse;margin-left:52.305pt" cellspacing="0"><tbody><tr style="height:29pt"><td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s116" style="padding-top: 2pt;padding-left: 6pt;padding-right: 5pt;text-indent: 0pt;line-height: 22pt;text-align: center;">remainder</p><p class="s116" style="padding-left: 6pt;padding-right: 5pt;text-indent: 0pt;line-height: 22pt;text-align: center;">sign</p></td><td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" rowspan="2"><p class="s116" style="padding-top: 2pt;padding-left: 10pt;padding-right: 9pt;text-indent: 0pt;line-height: 22pt;text-align: center;">Divisor</p><p class="s116" style="padding-left: 10pt;padding-right: 9pt;text-indent: 0pt;line-height: 22pt;text-align: center;">sign</p></td><td style="width:211pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s116" style="padding-top: 2pt;padding-left: 62pt;text-indent: 0pt;text-align: left;">Subtraction</p></td><td style="width:216pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="2"><p class="s116" style="padding-top: 2pt;padding-left: 74pt;padding-right: 73pt;text-indent: 0pt;text-align: center;">Addition</p></td></tr><tr style="height:29pt"><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s116" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s116" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td><td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s116" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s116" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td></tr><tr style="height:29pt"><td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Enough</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Not enough</p></td><td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 11pt;padding-right: 10pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td></tr><tr style="height:29pt"><td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 11pt;padding-right: 10pt;text-indent: 0pt;text-align: center;">Enough</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Not enough</p></td></tr><tr style="height:29pt"><td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td><td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">0</p></td><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 11pt;padding-right: 10pt;text-indent: 0pt;text-align: center;">Not enough</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Enough</p></td></tr><tr style="height:29pt"><td style="width:94pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td><td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;text-indent: 0pt;text-align: center;">1</p></td><td style="width:106pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Not enough</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">Enough</p></td><td style="width:111pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 11pt;padding-right: 10pt;text-indent: 0pt;text-align: center;">----</p></td><td style="width:105pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p class="s117" style="padding-top: 2pt;padding-left: 8pt;padding-right: 7pt;text-indent: 0pt;text-align: center;">----</p></td></tr></tbody></table>

<img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/aadda87e9086a37cb714b2970fa7596c0721f939.webp" width = "30%" />

1. **恢复余数法** 在下面的步骤中,余数和除数的和是存储在余数寄存器里面的,判断完成后,还要恢复原来的余数(即减去余数).之前的不带符号位除法**也都是恢复余数法**,只是没有表示出来.

      <table>
      <thead>
      <tr>
      <th style="text-align:center"><font color="#0000FF">余数</font></th>
      <th style="text-align:center"><font color="#FF0000">商</font></th>
      <th style="text-align:center">除数</th>
      <th style="text-align:center">得到本步操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#0000FF">1001</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">-</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#0000FF">001</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">左移</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#0000FF">001</font><font color="#FF0000">0</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">1111+0011 =0010,not enough</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1110</font></td>
      <td style="text-align:center"><font color="#0000FF">01</font><font color="#FF0000">0</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">左移</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1110</font></td>
      <td style="text-align:center"><font color="#0000FF">01</font><font color="#FF0000">00</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">1110+0011=0001, not enough</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1100</font></td>
      <td style="text-align:center"><font color="#0000FF">1</font><font color="#FF0000">00</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">左移</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#0000FF">1</font><font color="#FF0000">001</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">1100+0011=1111, enough</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#FF0000">001</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">左移</td>
      </tr>
      <tr>
      <td style="text-align:center"><font color="#0000FF">1111</font></td>
      <td style="text-align:center"><font color="#FF0000">0010</font></td>
      <td style="text-align:center">0011</td>
      <td style="text-align:center">1111+0011=0010,not enough</td>
      </tr>
      </tbody>
      </table>

   **最后,结果取 <font color=#FF0000>0010</font> 的补码整数 <font color=#FF0000>1110 </font>为最终结果.**

   + 缺点:Problem: recover remainder is high cost
   + 解决方案:使用不恢复余数法(加减相消法)

1. 加减相消法.

   + 规则
     + 将被除数符号拓展 n 位后存储在余数和商寄存器.
     + 如果被除数与除数符号相同, 作减法; 若符号位不同, 作加法.
       + 若新的**余数与除数符号相同, 上商 1**; 否则上商 0.
     + 新的余数(指左移前的余数)与除数符号位相同, 则 $R_{i+1}= 2R_i-Y$, 即`余数=余数<<1-除数`;否则$R_{i+1}= 2R_i+Y$
   + 商的修正:
     + **商左移一位. 若被除数和除数异号(即商为负), 商加一**
     + 若余数与被除数符号不同:
       + 若被除数和除数同号,余数加除数
       + 若被除数和除数异号,余数减除数
     + 注意：若做完如上修正后，余数为除数相反数，需要将余数置为0，同时商减一
   + 示例:
     <img src="https://unpkg.zhimg.com/rikka-os@latest/img/README.assets/35ad64b739a0dbd5d9908dcf33a496f7bd10bac0.webp" >
