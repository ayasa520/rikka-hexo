---
title: "Java 基础(七) 以“城堡游戏”为例改良代码(详见源代码)"
tag: 'Java'
category: 教程
date: 2020-12-27
---

## 1. 消除代码复制

在原来的代码中，至少两处用到了相同的提示信息，需要将提示信息放在一个函数 ```showPrompt()``` 中来减少重复代码。

## 2. 封装

封装以降低耦合度。在原来的代码中，Game 类大量使用了 Room 类中的成员，比如得到 currentRoom 的出口，正确的做法是在 Room 类中的 ```getExits()``` 以 String 返回出口，而非返回 Room 类的对象；Game 类中 ```goRoom()``` 函数也不应该直接操作 Room 类的成员，而应让 Room 类自己返回输入所对应的房间。

## 3. 可拓展性

在原来的代码中, Room 类中含有 4 个表示出口的 Room 类型对象, 这不是好的做法, 因为这样大大降低了代码的可拓展性, 如果要增加 "up" 或者 "down" 方向的出口, 就会变得十分复杂. 更好的方式是用容器来增加代码的灵活性. 改造后, 只需在 ```createRoom()```中写```outside().setExit("up", anotherRoom);```便可以使 outside 这个房间的 up 方向是 anotherRoom.
**增加可扩展性:框架+数据**

+ 命令的解析**脱离 if-else**
+ 定义一个 Handler 来处理命令
+ 用 Hash 表来保存命令和 Handler 之间的关系
