---
title: "Java 基础(十)  接口( Interface )以狐狸和兔子为例子"
tag: 'Java'
category: 教程
date: 2020-12-27
---
## 1. 接口

+ 接口是**纯抽象类**
  + 所有的成员函数都是抽象函数
  + 所有的成员变量都是public static final
    + final 变量意味着这个变量不可以改变值, final 类不可以被继承, final 的方法不可以被 override.
+ 接口规定了长什么样, 但是不管里面有什么

```Java
//一个接口的例子
public interface Cell {
     void draw(int x, int y, int size);
}

```

## 2. 实现一个接口

+ 继承用 extends, 接口用 implements
+ 类可以实现多个接口( 实现类似多继承的效果 )
+ 接口**可以继承接口**, 但不能继承类
+ 接口不能实现接口
+ 可以通过```instanceof```判断赋给接口变量的对象是不是某个类的

```Java
//一个实现接口的例子, Fox 继承了 Animal 类的同时实现了 Cell 的接口
public Fox extends Animal implements Cell {
     void draw(int x, int y, int size) {
        
     };
}
```

![几个类和接口之间的关系](https://unpkg.zhimg.com/rikka-os@latest/img/Java_abc_06.assets/75df19d5fd2d358edc3da30398bb01a43fdd895b.webp "几个类和接口之间的关系")
其中 Fox 和 Rabbit 都是继承自 Animal, 而 Field 作为容器, 接受的是 Cell, 由于 Java 不支持多继承, 所以将 Cell 做成接口, 在 Fox 和 Rabbit 内部分别实现这个接口, 就能把 FOX 和 Rabbit 赋给 Cell 的变量传给 Field 了.
