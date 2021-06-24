---
title: "Java 基础(九) 数据与表现分离( 以\"细胞自动机\"为例)"
tag: 'Java'
category: 教程
---

Field 维护了一个二维数组， 里面存放着 Cell，Field 可以往二维数组中存放、取出指定 Cell, 获得指定 Cell 的邻居; Cell 可以用 ```draw()``` 绘制自己； view 只做一件事: 从 Filed 获得数据, 根据数据来```paint()```.
