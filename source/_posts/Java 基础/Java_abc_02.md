---
title: "Java 基础(二) 类变量和类函数"
tag: 'Java'
category: 教程
---

```java
public class ClassA {
    private static int value;
    private int alpha;

    public static void f() {
        //alpha++   //ERROR
        value++;    //OK
    }

    public static void main(String[] arg) {
    ClassA a = new ClassA();
    ClassA b = new ClassA();
    }
}
```

在 ClassA 中有一个 static 类型的变量，它不属于 ClassA 创建的任何对象，而是属于 ClassA 本身。可以通过 `ClassA.value` 或者`a.value`来使用。`a.value`与`b.value`实际上是同一个变量。

`f()`就是一个类函数，可以直接调用，但`f()`内部**只能访问静态成员**。



ArrayList 可以实现一个可变的数组，与 C++ 中的 Vector 容器类似，内置了增加/插入`add()`、删除`remove()`等方法。

