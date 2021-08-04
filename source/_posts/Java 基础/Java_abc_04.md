---
title: "Java 基础(四) 容器与泛型"
tag: 'Java'
category: 教程
date: 2020-12-27
---


## 常用容器
+ 常用 Collections

![](https://unpkg.zhimg.com/rikka-os@1.0.3/img/Java_abc_06.assets/4ac92fdadbf8ac65a744814e500225e6382ebb55.webp)
### 1. ArrayList
类似于 c++ 中 Vector 的存在
```Java
package notebook;

import java.util.ArrayList;

public class NoteBook {
    private ArrayList<String> notes = new ArrayList<String>();//指定元素的类型

    public void add(String s) {
        notes.add(s);
    }

    public void insert(int index, String s) {
        notes.add(index, s);
    }


    public int getSize() {
        return notes.size();
    }

    public String getNote(int index) {
        return notes.get(index);
    }

    public void removeNote(int index) {
        notes.remove(index);
    }

    public String[] list() {
        String[] a = new String[notes.size()];
        return notes.toArray(a);//这个方法可以把ArrayList中的内容存到数组里
    }

    public static void main(String[] arg) {
        NoteBook nb = new NoteBook();
        nb.add("你好");
        nb.add("不错");
        nb.add("邪王真眼");
        nb.removeNote(2);
        String[] a = nb.list();
        //for (String s : a) {
        //    System.out.println(s);
        //}
        System.out.println(a);
    }
}
```

### 2. 集合容器(Set)
#### 1. HashSet
```java
HashSet<String> s = new HashSet<String>();
s.add("first");
s.add("second");
s.add("first");
System.out.println(s);
```
显示结果：
```
second
first
```
集合容器```HashSet```具有**无序性**和**无重复型**。此外，如果一个类的内部实现了```String toString()```函数(如数组、ArrayList 、HashMap )，那么可以直接用```System.out.println(容器名)```打印该函数内部指定返回的内容。
遍历 HashSet 可以使用迭代器或者 for-each 循环

```Java
//迭代器
Iterator iterator = s.iterator();
for(iterator.hasNext())
{
	...   
}
for(String string:s)
{
    ...
}

//for-each
```
----
##### HashSet 检查重复的方法 hashCode() 与 equals()
当把对象加入 HashSet 时，它会首先使用该对象的 hashcode 值u来判断对象加入的位置，但是同时也与其他对象的 hashcode 比对，如果没有相同的，这个对象**一定不是重复的**。如果 hashcode 相等，对象也不一定相等，这就会调用其中一者的 `equals()` 来判断是否真的相同。

#### 2. TreeSet
TreeSet 同样不允许有重复的元素，但是他会一直保持有序。
要使用 TreeSet，必须保证下面其中一项为真：
+ TreeSet 中的元素实现了 Comparable
+ 使用重载、取用 Comparable 参数的构造函数来创建 TreeSet
  
  ```java
  TreeSet<Song> tree = new TreeSet<Song>(new AuthorCompare());
  ```
### 3. 哈希表(HashMap)
哈希表以键值对的形式储存顺序。

```java
package coin;

import java.util.HashMap;
import java.util.Scanner;

public class Coin {
    private HashMap<Integer, String> coinnames = new HashMap<>();

    public Coin(){
        coinnames.put(1,"penny");
        coinnames.put(10,"dime");
        coinnames.put(25,"quarter");
        coinnames.put(50,"half-dollar");
        coinnames.put(50,"五毛");
    }

    public String getName(int amount)
    {
      //判断哈希表中是否存有这个Key
        if(coinnames.containsKey(amount)) {
            return coinnames.get(amount);
        } else {
            return "NOT FOUND";
        }
    }

    public static void main(String[] arg) {
        Coin coin = new Coin();
        Scanner in = new Scanner(System.in);
        int amount = in.nextInt();
        String name = coin.getName(amount);
        System.out.println(name);
    }
}
```

遍历哈希表中的值可以用以下方法：
```java
for(int key:coinnames.keySet()) {
    System.out.println(coinnames.get(key));
}
```
打印结果
```
penny
五毛
quarter
dime
```
没有打印出 "half-dollar" , 这是因为 HashMap 中键( Key )是**不允许重复**的，所以后一次的 “五毛” 会覆盖前一次。

## 2. 由 sort() 方法所知道的

ArrayList 类中不含 `sort()` 函数, 但是 Collections 类中含有 `sort()`方法, 所以可以使用`Collections.sort(List list)`将实现了 List 接口的 ArrayList 传进去.

```Java
//创建存放歌曲名的容器
private ArrayList<String> songList = new ArrayList<>();
//调用 sort() 函数, 根据首字母排序
Collections.sort(songList);
```

但当 ArrayList 中存放的不是 String 而是一个自定义的对象时, 就不能直接用了.如下面的代码不能通过编译:
```Java
private ArrayList<Song> songList = new ArrayList<>();
//调用 sort() 函数, 根据首字母排序
Collections.sort(songList);
```
---------------------------------------------------

以下两种都是正确的:
```java
public <T extends Animal> void takeThing(ArrayList <T> list) 
```
```java
public void takeThing(ArrayList<Animal> list)
```
这两者**不同**. 前者表示任何 Animal 或者 Animal 的子类都可以被传入, 后者仅能接收 ```ArrayLiast<Animal>``` 

----------------------------------

`sort()`函数的声明如下:
```java
public static <T extends Comparable< ? super T>> void sort(List<T> list)
```
由此可知,  T 必须实现( 此处也是 extends ) Comparable 这个接口.`? super T`代表 Comparable 的类型参数必须是 T 或者 T 的父型.
所以 Song 类应该是这样的:
```java
class Song implements Comparable<Song>
{
    //具体属性略
    ...
    @Override
    public int comepareTo(obeject o)
    {
        //只需要按照标题比较
        return title.compareTo(o.getTitle);
    }
}
```
comepareTo 返回值小于 0, 则传入的 Song 大于执行的 Song.

----------
除了实现 Comparable, 还可以用 Comparator 参数来调用不同方式的排序.

```java
class AuthorCompare implements Comparator<Song>{
    @override
    public int compare(Song o1, Song o2){
        //这里的compare与之前compareTo作用是一样的, 都是根据某个指标相减的结果返回, 从而判断大小
        return o1.getSAuthor.compareTo(o2.getAuthor);
    }
}
```

于是, 可以在其他地方调用两个参数版本的`sort()`:
```java
Collection.sort(songList,new AuthorCompare);
```