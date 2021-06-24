---
title: "Java 基础(一) 开放的访问属性(见 Display 项目)"
tag: 'Java'
category: 教程
---

- public 意味着任何人都可以自由地使用
- 如果一个函数前没有加 public 限定，意味着和他位于**同一个包**的类可以访问，称为 friendly
- protected
- public Class 意味着任何人都可以用这个类来定义变量
  要求：public Class 必须定义在同名源文件中
  一个 .java 文件为一个编译单元，**一个编译单元只能有一个 public 的类**

