---
title: "Java 基础(六) Object 类"
tag: 'Java'
category: 教程
---

几乎在所有的 oop 语言中，都有一个“**根**”的存在。在 Java 中，这个“根”就是 **Object** 类。
Object 类中包含有：

+ ```toString()```
+ ```equals()```

两个方法，前者可以打印对象的信息（可以在子类中具体实现）；后者**判断是否管理着同一个对象** （默认实现为 `==`） 。如果要实现判断内容是否一致，需要在子类中实现。比如，要实现只要 CD 类中 artist 成员相同，```equals()```就返回 true，需要这样写：

```java
@Override
public boolean equals(Object obj)
{
    CD a = (CD)obj;//造型
    return artist.equals(a.artist);//equals判断两者所指向的对象的内容(可以自己实现判断标准)而==判断的是两者的值是否相等(即是否指向同一个对象)

}
```

![image-20210513011757424](https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/image/Java_abc_06.assets/image-20210513011757424.webp)

+ `equals` 比较二者指向对象的内容
+ `==` 比较二者是否指向同一地址（管理同一个对象）