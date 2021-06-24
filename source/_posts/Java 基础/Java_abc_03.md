---
title: "Java 基础(三) 对象数组"
tag: 'Java'
category: 教程
---

对象数组与基础类型的数组如`int []`是不同的。对象数组的每个元素都是对象的**管理者**，而非对象的本身。

```java
String[] a = new String[10];
System.out.println(a[0]);//显示为null
System.outprintfln(a[0].length());//抛出异常
```

当通过创建了一个`String`类型的数组时，这个数组的每一个“格子”里都是`String`类型的**管理者**。此时该数组每一个元素管理的都是空的，即`null`。

因此，需要给它每一个元素创建对象，如：

```java
for(int i = 0; i < a.length; i++){
  a[i] = "" + i;
}

```

## 对象数组的 for-each 循环

```java
class MyClass {
    private int value;

    public void set(int val) {
        value = val;
    }

    public int  get() {
        return value;
    }
    public static void main(String[] arg){
        MyClass []a = new MyClass[10];
        for(int i=0;i<10;i++){
            a[i] = new MyClass();
            a[i].set(1);//赋值为1
        }
        for(MyClass i: a){
            i.set(0);//赋值为0
        }
        for(MyClass i: a){
            System.out.println(i.value);
        }
    }
}
```

输出结果为：
```
0
0
0
0
0
0
0
0
0
0
```
这其中发生的事情是```for-each```循环中，变量```i```与a中的元素管理**同一个对象**，所以调用```i.set(0)```后，遍历```a```数组得到的结果也是0。
