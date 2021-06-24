---
title: "Java 基础(五) 继承(以实现一个存放 CD 、DVD 的 Database 为例)"
tag: 'Java'
category: 教程
---

在 Database.java 文件中实现了一个 Database 的类，其中含有 ArrayList<Item> 类型的成员变量 list 来存放数据。此外还有对 list 进行增添和遍历的```add(Item newItem)```和```list()```方法。

```java
//Database.java
package database;

import java.util.ArrayList;

public class Database {
    private ArrayList<Item> list = new ArrayList<>();
    public void add(Item newItem)
    {
        list.add(newItem);
    }

    public void list(){
        for(Item item:list)
        item.print();
    }
    public static void main(String[] arg) {
    Database db = new Database();
    db.add(new CD("123","123",123,123,"123"));
    db.list();
    }
}
```
Item 作为父类，仅含有最基础的成员变量和成员函数。


```java
//Item.java
package database;

public class Item {

    private String title;
    private int playingTime;
    private boolean gotit = false;
    private String comment;

    public Item(String title, int playingTime, String comment) {
        this.title = title;
        this.playingTime = playingTime;
        this.comment = comment;
    }

    public void print()
    {
        System.out.print(title);
    }
}

```
CD 是由 Item 派生的一个类，在 Item 基础上增添了很多属性，并且重写了```print()```方法。在 Database 类中调用```item.print()```方法时，若子类重写了该方法，只会调用子类中的。
```java
//CD.java
package database;

public class CD extends Item {
    private String artist;
    private int numofTracks;

    public void print() {
        System.out.print("CD:");
        super.print();
        System.out.println(artist);
    }

    public CD(String title, String artist, int numofTracks, int playingTime, String comment) {
        super(title, playingTime, comment);
        this.artist = artist;
        this.numofTracks = numofTracks;
    }
}

```
## 子类继承了什么
父类中 **private** 属性的**只有自己**可以访问，**protected** 属性的还可供**子类和同一个包内的其他类访问**。

对于父类中的变量，可以通过将其设为 protected 从而在子类的构造器中对其进行初始化，然而更好的方法是变量属于哪一个类，就用哪一个类的构造器初始化，此时可以借助子类的```super()```方法传递给父类构造器。初始化的顺序为：1. 父类构造（若子类中未给```super()```参数或者未调用```super()```，则自动调用父类默认构造器；若给了```super()```参数，调用父类对应的构造器）； 2. 定义初始化； 3. 子类构造。
## 子类和父类复杂的关系
若子类与父类含有同名的成员变量，在子类中父类的变量会被隐藏。而父类的函数中处理的还是父类的变量。使用```super.f()```可以**调用父类中的```f()```函数**。

**重写**（ Override ）不同于重载（ Overload ），它是父类中某个方法的重新实现而不是拓展。在重写的方法之前加上 ```@Override```可以让编译器帮助检查。

### 子类和子类型
+ 类定义了类型
+ 子类定义了子类型
+ 子类的对象可以被**当作父类的对象**来使用
  + 赋值给父类的变量
  + 传递给需要父类对象的函数
  + 放进存放父类对象的容器里

### 多态变量
+ Java 的对象变量是**多态**的，它们能保存不止一种类型的对象
+ 它们可以保存的是声明类型的对象，或声明类型的子类的对象
+ 当把子类的对象赋给父类的变量的时候，就发生了**向上造型**，发生向上造型之后，尽管变量是父类类型的，但调用的仍然是子类的方法（如上述存放 Item 类型容器进行 for-each 循环，并调用 ```print()``` 方法时，调用的是子类中重写的方法而非父类的方法）。
注：向下造型并非任何时候都不可行，唯一可行的情况是父类型变量实际管理的对象是该子类型的。
+ 若函数需要一个 Animal 类型参数的 ArrayList，那么只能传入 ```ArrayList<Animal>```而不能是```ArrayList<Dog>```，否则就只能把函数的声明改为
    ```java
    public <T extends Animal> void takeThing (ArrayList<T> list)
    ```
    或者
    ```java
    public void takeThing (ArrayList<？ extends Animal> list)
    ```
    注：C++ 实现这个很复杂，可以用 C++ 20 的新内容实现：
    ```C++
    template<typename T>
    concept Another = (std::is_base_of<Animal, T>::value);
    template <typename T>
    void bark(vector<T*> something) requires Another<T>{}
    ```
