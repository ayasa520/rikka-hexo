---
title: 图的应用
date: 2022-02-01 18:22:36
description: 图的应用
tag: ['图','数据结构']
categories: 'NJU 笔记'
---
<meta name="referrer" content="no-referrer" />

## 最小生成树

### 生成树回顾

+ 生成树：所有顶点均由边连接在一起，但不存在回路的 图
+ 一个图可以有多个不同的生成树
+ 所有的生成树具有以下的共同特点:
  + 生成树的顶点个数与图的顶点个数相同
  + 生成图是图的**极小连通子图**，去掉一条边则非连通
  + $n$ 个结点的连通图的生成树有 $n-1$ 条边
  + 生成树再加一条边会形成回路
+ 无向图的生成树:
  + 深度优先生成树
  + 广度优先生成树

**![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/ba02797676e4d57842bbf0cd8ed838fac62a8e9b.png)**

### 最小生成树

对于一个无向网, 该网所得有生成树中, 各边权值和最小的生成树叫做最小生成树.

典型用途: 用最小的成本在城市之间建立通信网

**MST 性质:**

在生成树的构造过程中, 图的 $n$ 个顶点分为两个集合:

+ 已经位于生成树的顶点集: U
+ 尚未落入生成树的顶点集: V-U

接下来应该加入连通U与V-U中顶点的边中选取权值最小的边, 且不能形成环路



#### Prim 算法

思想:

+ 开始时 U 中仅包含一个顶点, 在 U 集合中找一个顶点, V-U 中找一个顶点, 将依附于这两个顶点的边加入生成树, 这条边具有的特点是: 符合要求的边中权值最小.

#### Kruskal 算法

思想:

+ 贪心. 一开始最小生成树的状态为 n 个顶点而无边的非连通图 T=(V,{}), 每个顶点自成一个连通分量. 
+ 在边集合 E 中选取权值最小的边, 若该边依附的顶点落在 T 的不同连通分量上(即加入这条边不会形成环) , 则将这条边加入T ,否则舍去这条边, 选取下一条代价最小的边.

两个算法的比较:

|   算法   |   Prim   |    kruskal    |
| :------: | :------: | :-----------: |
|   思想   |  选择点  |    选择边     |
|  复杂度  | $O(n^2)$ | $O(e\log_2e)$ |
| 适用范围 |  稠密图  |    稀疏图     |



## 最短路径

典型应用: 交通网络问题:

+ 顶点:地点
+ 弧:表示两个地点之间连通
+ 弧上的权值: 两个地点之间额距离, 交通费或者途中花费的时间等等

问题抽象: 在有向网中 A 点到 B 点的多条路径中, 寻找一条权值和最小的路径,称为最短路径.

与最小生成树的区别: 最短路径不一定要包括所有的顶点或边.

### Dijkstra 算法--单源最短路径

1. 初始化:先找出源点 $V_0$ 到各终点 $V_K$ 的直达路径$(V_0,V_K)$ ,即通过一条弧到达的路径. 若不存在, 权值记为无穷大.$S = \{V_0\},T = V-S$

2. 选择:从这些路径中找一条最短的路径$(V_0,U)$, $U$ 加入 $S$

3. 更新:然后对其余各条路径进行适当调整:

   若图中存在路径 $(U,V_K)$ 使得 $(V_0,U)+(U,V_K)<(V_0,V_K)$ ,

   则用路径 $(V_0,U)+(U,V_K)$ 代替 $(V_0,V_K)$

   再调整后的各条路径中,再在 $T$ 寻找长度最短的路径, 以此类推

![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/0f970e2acef72dedc366e4e81d040663758a22a1.png)

![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/215e31e0c8d0258d8085265c31a63ef5f30141bd.png)



### Floyd 算法--所有顶点间的最短路径

求所有顶点间的最短路径：

+ 以每一个顶点为源点，重复执行 Dijkstra 算法 n 次 $O(n^3)$
+ Floyd 算法

初始：建立一个邻接矩阵, 对角线元素置为0, 不直接相连的顶点置为$\infty$ , 否则置为权值. 然后依次在原来的直接路径中加入中间顶点, 若加入后路径变短, 则修改. 所有顶点探查完毕后, 结束.

**![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/9fa6ff7e115a06894cafa0b14488039d42632014.png)**

**过程图**

$$
\text { 初始 : }\left[\begin{array}{lll}
0 & 4 & 11 \\
6 & 0 & 2 \\
3 & \infty & 0
\end{array}\right] \text { 路径: }\begin{array}{|l|l|r|}
\hline & \mathrm{AB} & \mathrm{AC} \\
\hline \mathrm{BA} & & \mathrm{BC} \\
\hline \mathrm{CA} & & \\
\hline
\end{array}
$$

$$
\begin{array}{l}
\text { 加入A : }\left[\begin{array}{lll}
0 & 4 & 11 \\
6 & 0 & 2 \\
3 & {\color{blue}7} & 0
\end{array}\right]\text { 路径 : }
\begin{array}{|l|l|l|}
\hline & \mathrm{AB} & \mathrm{AC} \\
\hline \mathrm{BA} & & \mathrm{BC} \\
\hline \mathrm{CA} & \mathrm{\color{blue} {CAB}} & \\
\hline
\end{array}
\end{array}
$$

$$
\text { 加入B: }\left[\begin{array}{lll}
0 & 4 & \color{red} 6 \\
6 & 0 & 2 \\
3 & {\color{blue}7} & 0
\end{array}\right] \text { 路径: } \begin{array}{|l|l|r|}
\hline & \mathrm{AB} & \mathrm{\color{red}ABC} \\
\hline \mathrm{BA} & & \mathrm{BC} \\
\hline \mathrm{CA} & \mathrm{\color{blue}CAB} & \\
\hline
\end{array}
$$

$$
加入C :\left[\begin{array}{lll}0 & 4 & \color{red}6 \\{\color{green} 5} & 0 & 2 \\3 & \ {\color{blue}7} & 0\end{array}\right] \text{路径: }\begin{array}{|l|l|r|}
\hline & \mathrm{AB} & \mathrm{\color{RED}{ABC} } \\
\hline \mathrm{\color{green} {BCA} } & & \mathrm{BC} \\
\hline \mathrm{CA} &\mathrm{\color{blue} {CAB} } & \\
\hline
\end{array}
$$


## 用顶点表示活动的网络(AOV网络)

 把一个工程分为若干个子工程, 只要这些子子工程(活动)完成了, 工程就完成了.

AOV网络: 用一个有向图表示一个工程的各个子工程的相互制约关系, **顶点表示活动**, **边表示活动之间的制约**

### 拓扑排序


$$
\begin{array}{|l|l|l|}\hline \text { 课程代号 } & {\text { 课程名称 }} &  {\text { 先修课 }} \\\hline \mathrm{C} 1 & \text { 程序设计基础 } & \text { 无 } \\\hline \mathrm{C} 2 & \text { 离散数学 } & \mathrm{C} 1 \\\hline \mathrm{C} 3 & \text { 数据结构 } & \mathrm{C} 1, \mathrm{C} 2 \\\hline \mathrm{C} 4 & \text { 汇编语言 } & \mathrm{C} 1 \\\hline \mathrm{C} 5 & \text { 语言的设计和分析 } & \mathrm{C} 3, \mathrm{C} 4 \\\hline \mathrm{C} 6 & \text { 计算机原理 } & \mathrm{C} 11 \\\hline \mathrm{C} 7 & \text { 编译原理 } & \mathrm{C} 3, \mathrm{C} 5 \\\hline \mathrm{C} 8 & \text { 操作系统 } & \mathrm{C} 3, \mathrm{C} 6 \\\hline \mathrm{C} 9 & \text { 高等数学 } & \text { 无 } \\\hline \mathrm{C} 10 & \text { 线性代数 } & \mathrm{Cg} \\\hline \mathrm{C} 11 & \text { 普通物理 } & \mathrm{C} 9 \\\hline \mathrm{C} 12 & \text { 数值分析 } & \mathrm{C} 1, \mathrm{C} 9, \mathrm{C} 10 \\\hline\end{array}
$$

由上表得 AOV 图:

![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/c4bf9c5657308a126a51240e48209950e70e7ef9.png)

AOV 网络特点:

+ i 到 j 有一条有向路径, 则 i 为 j 的前驱, j 为 i 的后继.
+ 若<i, j> 为图中有向边, 则 i 为 j 的直接前驱, j 为 i 的直接后继.
+ 由于AOV 网络中, 前驱表示先决条件, 因此在 AOV 网络中不允许出现**有向环**, 对于给定的 AOV 网络, 必须判断它是否存在有向环----**拓扑排序**

**拓扑排序的定义**:

+ 将 AOV 网络中各个顶点排列成一个线性有序序列, 保证原 AOV 网络中的前驱顶点一定位于后继顶点之前.

**步骤:**

+ 在网络中找一个没有前驱的顶点输出.
+ 在网络中删除这个顶点以及所有出边.
+ 不断重复, 直到找不到无前驱的顶点(此时网络中仍然存在顶点,则**该AOV图中含有向环**)或者所有的顶点都已经输出.

如上述 AOV 图可以这样拓扑排序(注意不唯一):

![](https://i0.hdslb.com/bfs/album/6a3f33b97ef39100899f0f9f7886d8513281928c.gif)

##  用边表示活动的网络 (AOE 网络)

**AOE** **网络**: 用有向边表示活动, 有向边上的权值表示持续时间,顶点表示事件.

如图所示, 事件表示在它值钱的活动已经完成, 之后的活动可以开始.

![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/b939f579873daeafb458c7261b9863f0e0546f27.png)

对应的有向图:

![](https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/article/2890ede007ee5b488db4c8e3521a54509b96f22a.png)


AOE 网络应用:

+ 估计工程总共需要的时间
+ 为缩短工程所需时间, 应该加快哪些活动?

### 关键路径

**定义**: **路径长度最长的路径**

+ 入度为零的点:  源点, 表示工程开始
+ 出度为零的点: 汇点, 表示工程结束

只要找到了关键路径, 上面的两个问题就能解决.



几个描述量:

+ ve(vj):事件 $v_j$ 最早发生时间
+ vl(vj):事件 $v_j$ 最晚发生时间
+ e(i): 活动 $a_i$ 最早开始时间
+ l(i):活动 $a_i$ 最晚开始时间
+ l(i)-e(i): 完成活动 $a_i$ 的时间余量, 即在这一段时间内任何时候开始都不会影响到进度.

**关键活动:** 关键路径上的活动,`l(i)- e(i)==0`.只要找到关键活动, 就能构建关键路径.

对于一个事件来讲, 它相邻的活动可能不止两个;对于一个活动来讲, 他相邻的事件仅有确定的两个.

$v_i-a(不止一个)->v_j-b->v_k$

需要计算的量:

+ $e(b) = ve(v_j)$
+ $l(b) = vl(v_k)-w_{j,k}$
+ $ve(v_j) = \max(ve(v_i)+w_{i,j})$
+ $vl(v_j)=\min(vl(v_k)-w_{j,k})$

**步骤:**

1. 正向计算 $ve()$

   $ve(v_1)= 0$,  则根据递推公式可以求出

2. 反向计算 $vl()$

   由最后一个事件的最晚结束时间往前推

3. 求各个活动的 $l()-e()$

举个例子：

对于这张网络:

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="671px" viewBox="-0.5 -0.5 671 351" content="&lt;mxfile host=&quot;b78d3ecd-dc24-47eb-8e6f-14ccdd690fd9&quot; modified=&quot;2021-01-15T04:54:21.419Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.52.1 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36&quot; etag=&quot;0wweQ8_3dG01VYYqd2gY&quot; version=&quot;13.10.0&quot; type=&quot;embed&quot;&gt;&lt;diagram id=&quot;6hGFLwfOUW9BJ-s0fimq&quot; name=&quot;Page-1&quot;&gt;&lt;mxGraphModel dx=&quot;654&quot; dy=&quot;568&quot; grid=&quot;1&quot; gridSize=&quot;10&quot; guides=&quot;1&quot; tooltips=&quot;1&quot; connect=&quot;1&quot; arrows=&quot;1&quot; fold=&quot;1&quot; page=&quot;1&quot; pageScale=&quot;1&quot; pageWidth=&quot;827&quot; pageHeight=&quot;1169&quot; math=&quot;0&quot; shadow=&quot;0&quot;&gt;&lt;root&gt;&lt;mxCell id=&quot;0&quot;/&gt;&lt;mxCell id=&quot;1&quot; parent=&quot;0&quot;/&gt;&lt;mxCell id=&quot;153&quot; style=&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;143&quot; target=&quot;152&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;154&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;143&quot; target=&quot;150&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;155&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;143&quot; target=&quot;151&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;143&quot; value=&quot;&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;30&quot; y=&quot;110&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;145&quot; value=&quot;v9&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;620&quot; y=&quot;90&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;161&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0;exitDx=0;exitDy=0;entryX=0;entryY=1;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;146&quot; target=&quot;147&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;146&quot; value=&quot;v6&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;374&quot; y=&quot;270&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;162&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=1;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;147&quot; target=&quot;145&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;147&quot; value=&quot;v8&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;490&quot; y=&quot;160&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;163&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;148&quot; target=&quot;145&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;148&quot; value=&quot;v7&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;490&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;158&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0;exitDx=0;exitDy=0;entryX=0;entryY=1;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;149&quot; target=&quot;148&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;159&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;149&quot; target=&quot;147&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;149&quot; value=&quot;v5&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;360&quot; y=&quot;90&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;156&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=1;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;150&quot; target=&quot;149&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;150&quot; value=&quot;v3&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;220&quot; y=&quot;160&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;160&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;151&quot; target=&quot;146&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;151&quot; value=&quot;v4&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;220&quot; y=&quot;270&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;157&quot; style=&quot;edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0;entryDx=0;entryDy=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot; source=&quot;152&quot; target=&quot;149&quot;&gt;&lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;152&quot; value=&quot;&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;220&quot; y=&quot;10&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;164&quot; value=&quot;v1&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;30&quot; y=&quot;110&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;165&quot; value=&quot;v2&quot; style=&quot;ellipse;whiteSpace=wrap;html=1;aspect=fixed;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;220&quot; y=&quot;10&quot; width=&quot;80&quot; height=&quot;80&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;167&quot; value=&quot;a1=6&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;120&quot; y=&quot;70&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;168&quot; value=&quot;a2=4&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;140&quot; y=&quot;150&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;169&quot; value=&quot;a3=5&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;120&quot; y=&quot;240&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;170&quot; value=&quot;a4=1&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;310&quot; y=&quot;40&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;171&quot; value=&quot;a5=1&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;300&quot; y=&quot;160&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;172&quot; value=&quot;a6=2&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;320&quot; y=&quot;310&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;173&quot; value=&quot;a7=9&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;430&quot; y=&quot;60&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;174&quot; value=&quot;a8=7&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;410&quot; y=&quot;170&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;175&quot; value=&quot;a9=4&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;450&quot; y=&quot;270&quot; width=&quot;40&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;176&quot; value=&quot;a11=4&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;575&quot; y=&quot;190&quot; width=&quot;50&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=&quot;177&quot; value=&quot;a10=2&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&lt;mxGeometry x=&quot;580&quot; y=&quot;40&quot; width=&quot;50&quot; height=&quot;20&quot; as=&quot;geometry&quot;/&gt;&lt;/mxCell&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://viewer.diagrams.net/?client=1&amp;page=0&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:351px;"><defs/><g><path d="M 68.28 121.72 L 184.51 53.23" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 189.04 50.57 L 184.78 57.14 L 184.51 53.23 L 181.23 51.11 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 80 150 L 184.2 197.36" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 188.98 199.54 L 181.16 199.83 L 184.2 197.36 L 184.06 193.45 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 68.28 178.28 L 185.68 305.32" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 189.24 309.18 L 181.92 306.41 L 185.68 305.32 L 187.06 301.66 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="40" cy="150" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><ellipse cx="630" cy="130" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 130px; margin-left: 591px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v9</div></div></div></foreignObject><text x="630" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v9</text></switch></g><path d="M 412.28 281.72 L 466.98 232.54" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 470.88 229.03 L 468.02 236.31 L 466.98 232.54 L 463.34 231.11 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="384" cy="310" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 310px; margin-left: 345px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v6</div></div></div></foreignObject><text x="384" y="314" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v6</text></switch></g><path d="M 540 200 L 596.44 161.85" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 600.79 158.91 L 596.95 165.73 L 596.44 161.85 L 593.03 159.93 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="500" cy="200" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 200px; margin-left: 461px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v8</div></div></div></foreignObject><text x="500" y="204" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v8</text></switch></g><path d="M 540 40 L 597.21 97.21" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 600.93 100.93 L 593.5 98.45 L 597.21 97.21 L 598.45 93.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="500" cy="40" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 40px; margin-left: 461px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v7</div></div></div></foreignObject><text x="500" y="44" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v7</text></switch></g><path d="M 398.28 101.72 L 465.92 70.92" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 470.7 68.75 L 465.78 74.83 L 465.92 70.92 L 462.88 68.46 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 398.28 158.28 L 454.72 196.43" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 459.07 199.37 L 451.31 198.35 L 454.72 196.43 L 455.23 192.55 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="370" cy="130" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 130px; margin-left: 331px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v5</div></div></div></foreignObject><text x="370" y="134" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v5</text></switch></g><path d="M 270 200 L 336.21 161.49" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 340.75 158.85 L 336.46 165.39 L 336.21 161.49 L 332.94 159.34 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="230" cy="200" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 200px; margin-left: 191px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v3</div></div></div></foreignObject><text x="230" y="204" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v3</text></switch></g><path d="M 270 310 L 337.63 310" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 342.88 310 L 335.88 313.5 L 337.63 310 L 335.88 306.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="230" cy="310" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 310px; margin-left: 191px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v4</div></div></div></foreignObject><text x="230" y="314" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v4</text></switch></g><path d="M 270 50 L 336.55 97.99" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 340.81 101.06 L 333.08 99.81 L 336.55 97.99 L 337.18 94.13 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><ellipse cx="230" cy="50" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><ellipse cx="40" cy="150" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 150px; margin-left: 1px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v1</div></div></div></foreignObject><text x="40" y="154" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v1</text></switch></g><ellipse cx="230" cy="50" rx="40" ry="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 78px; height: 1px; padding-top: 50px; margin-left: 191px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">v2</div></div></div></foreignObject><text x="230" y="54" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">v2</text></switch></g><rect x="90" y="70" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 80px; margin-left: 110px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a1=6</div></div></div></foreignObject><text x="110" y="84" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a1=6</text></switch></g><rect x="110" y="150" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 160px; margin-left: 130px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a2=4</div></div></div></foreignObject><text x="130" y="164" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a2=4</text></switch></g><rect x="90" y="240" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 250px; margin-left: 110px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a3=5</div></div></div></foreignObject><text x="110" y="254" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a3=5</text></switch></g><rect x="280" y="40" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 50px; margin-left: 300px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a4=1</div></div></div></foreignObject><text x="300" y="54" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a4=1</text></switch></g><rect x="270" y="160" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 170px; margin-left: 290px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a5=1</div></div></div></foreignObject><text x="290" y="174" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a5=1</text></switch></g><rect x="290" y="310" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 320px; margin-left: 310px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a6=2</div></div></div></foreignObject><text x="310" y="324" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a6=2</text></switch></g><rect x="400" y="60" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 70px; margin-left: 420px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a7=9</div></div></div></foreignObject><text x="420" y="74" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a7=9</text></switch></g><rect x="380" y="170" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 180px; margin-left: 400px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a8=7</div></div></div></foreignObject><text x="400" y="184" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a8=7</text></switch></g><rect x="420" y="270" width="40" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 280px; margin-left: 440px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a9=4</div></div></div></foreignObject><text x="440" y="284" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a9=4</text></switch></g><rect x="545" y="190" width="50" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 200px; margin-left: 570px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a11=4</div></div></div></foreignObject><text x="570" y="204" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a11=4</text></switch></g><rect x="550" y="40" width="50" height="20" fill="none" stroke="none" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 50px; margin-left: 575px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: nowrap; ">a10=2</div></div></div></foreignObject><text x="575" y="54" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">a10=2</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://desk.draw.io/support/solutions/articles/16000042487" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>

有如下分析:
$$
\begin{array}{|c|r|c|}
\hline \text { 顶点 } & {\text { ve }} &  {\text { vI }} \\
\hline \text { v1 } & 0 & 0 \\
\hline \text { v2 } & 6 & 6 \\
\hline \text { v3 } & 4 & 6 \\
\hline \text { v4 } & 5 & 8 \\
\hline \text { v5 } & 7 & 7 \\
\hline \text { v6 } & 7 & 10 \\
\hline \text { v7 } & 16 & 16 \\
\hline \text { v8 } & 14 & 14 \\
\hline \text { v9 } & 18 & 18 \\
\hline
\end{array}\begin{array}{|l|l|l|l|}
\hline \text { 活动 } & \mathrm{e} & \mathrm{l} & \mathrm{l}-\mathrm{e} \\
\hline \mathrm{a} 1 & 0 & 0 & 0 \\
\hline \mathrm{a} 2 & 0 & 2 & 2 \\
\hline \mathrm{a} 3 & 0 & 3 & 3 \\
\hline \mathrm{a} 4 & 6 & 6 & 0 \\
\hline \mathrm{a} 5 & 4 & 6 & 2 \\
\hline \mathrm{a} 6 & 5 & 8 & 3 \\
\hline \mathrm{a} 7 & 7 & 7 & 0 \\
\hline \mathrm{a} 8 & 7 & 7 & 0 \\
\hline \mathrm{a} 9 & 7 & 10 & 3 \\
\hline \mathrm{a} 10 & 16 & 16 & 0 \\
\hline \mathrm{a} 11 & 14 & 14 & 0 \\
\hline
\end{array}
$$
则关键路径为: 

```cpp
     
V1→V2→V5→V8/V7→V9
```

分析:

+ 两个顶点之间存在多条关键路径, 需要同时缩短这些关键路径以减少总的时间.
+ 若关键事件缩减过多, 会造成它不再是关键事件.
