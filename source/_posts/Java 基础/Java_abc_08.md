---
title: "Java 基础(八) 抽象"
tag: 'Java'
category: 教程
---
## 1. 概念

+ 抽象函数--表达概念而无具体实现代码的函数
+ 抽象类--表达概念而无法实例化对象的函数

## 2. 特点

+ 带有 **abstract** 修饰符的函数
+ 有抽象函数的类一定是抽象类
+ 抽象类不能制造对象, 但是可以定义变量
  + 任何继承了抽象类的非抽象类的对象可以赋给这个变量

## 实现抽象函数

+ 继承自抽象类的子类必须实现基类的抽象函数, 否则他自己就成为抽象函数

```Java
public abstract class AbstractClass{
    public abstract int abstractMethod();
}
```

## 与 C++ 相比

|C++|Java|
|:--:|:--:|
|虚函数|普通函数|
|纯虚函数|抽象函数|
|抽象类|抽象类|
|虚基类|接口|
C++ 和 Java 实现多态的方式不同, 在 Java 中, 普通的函数就相当于 C++ 中的 **virtual function**, 从**向上造型**时候的例子可以看出, 即使变量本身是父类的, 但实际管理的对象是子类的, 默认调用的都是子类的函数, 如:

```Java
public class A {
    public void print(){System.out.println("A");}

    public static void main(String[] args) {
        A temp = new B();
        temp.print();
    }
}

public class B extends A {
    @Override
    public void print() {System.out.println("B");}
}

```

输出:

```
B
```

同理, 在存放基类对象的容器中添加子类的对象, 调用这些对象的函数时永远都是**调用自己类**的.

在 C++ 中默认的函数没有这种效果,而给函数加上 **virtual** 关键字后, 可以实现 Java 中的效果, 如:

```cpp
#include<iostream>
#include <vector>
using namespace std;
class A {
public:
 A() {}
 ~A() {}
 void print() { cout << "A" << endl; }
 virtual void print_v() { cout << "A" << endl; }
};
class B :public A
{
public:
 B() {}
 ~B() {}
 void print() { cout << "B" << endl; }
 virtual void print_v() { cout << "B" << endl; }
};
int main()
{
 A* temp = new B();
 temp->print();
 temp->print_v();
}
```

输出:

```
A
B
```

需要注意的是, C++ 中实现多态必须使用指针, 否则无论何时都只会调用**静态类型**( 变量类型 )的成员函数. 要在 C++ 中实现上文中 CD 存放的例子, 可以用容器```vector<Item*>```, 只需注意存放的类型必须为 `Item*`, 将需要在子类中重写的函数设为 virtual 即可.
