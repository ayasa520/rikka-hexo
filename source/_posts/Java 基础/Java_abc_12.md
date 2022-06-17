---
title: "Java 基础(十二)  流"
tag: 'Java'
category: 教程
date: 2020-12-27
---

## 1. 流的基础类

+ InputStream
+ OutputStream
  所有的输入、输出都基于这两个类. 这两个类的操作很有限, 都是**字节**( byte )层面的读写.
  注: Java 中 char 为两个字节 ( \u0000~\uFFFF ), byte 为一个字节 (-128 ~ 127).

```Java
package hello;

import java.io.IOException;
public class Main {
    public static void main(String[] args) {
        byte[] buffer = new byte[1024];
        try {
           int len =  System.in.read(buffer);
           String s = new String(buffer,0,len);
           System.out.println("读到了"+len+"字节");
            System.out.println(s);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

```Java
//输入
nihao你好
```

```java
//输出
读到了12字节
nihao你好
```

## 2. 文件流

+ FileInputStream
+ FileOutputStream

这两个类可以对文件进行字节层面上的**二进制**输入输出

```java
public static void main(String[] args) {
    byte[] buffer = new byte[10];
    for(int i = 0;i<10;i++)
    {
        buffer[i] = (byte)i;
    }
    try {
        FileOutputStream out = new FileOutputStream("a.bat");
        out.write(buffer);
        out.close();
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }catch (IOException e){
        e.printStackTrace();
    }

}
```

```java
//打开 a.bat
00 04 46 06 d8 ef 46 06 00 00  
```

## 3. 流过滤器

FileInputStream 和 FileOutputStream只能实现字节的读写, 如果需要写(读)入基本类型的数据, 就需要用到流过滤器.

+ 写(读)如**基本数据类型** DataOutputStream ( DataInputStream ) , 这两者是二进制写(读)

    ```java
    DataOutputStream out =
    new DataOutputStream(
        //使用缓冲, 避免频繁对硬盘读写
        new BufferedOutputStream(
            new FileOutputStream("a.bat")));
    //可以写入 int 
    out.write(123);
    DataInputStream in = 
    new DataInputStream(
        //使用缓冲, 避免频繁对硬盘读写
        new BufferedInputStream(
            new FileInputStream("a.bat")));
    //可以读入 int 
    int j = in.readInt();
    out.close();
    ```

## 4. 文本数据 Reader/Writer

若文件是 Unicode 编码的， 可以直接用 Reader/Writer 打开读写， 但是实际情况下并不是所有的文件都是 Unicode ，所以需要借助 Stream 打开文件, 以过滤器的方式输入输出.

```java
//写入字符
PrintWriter pw = new PrintWriter(
    //缓冲
    new BufferedWriter(
        //OutputStreamWriter 是字符流到字节流的桥梁
        new OutputStreamWriter(
            new FileOutputStream("a.txt")
        )
    )
);
pw.println(123); 
pw.printf("")//格式化输出
pw.close();

//读入字符
BufferedReader in = new BufferedReader (
    new InputStreamReader(
        new FileInputStream ("a.txt"))
);
String line;
while ((line = in.readLine())!=null){
    System.out.println(line);
}
```

**InputStreamReader** 和 **OutputStreamWriter**起到了桥梁的作用, 将字符流和字节流建立了联系. 在他们的构造器中可以添加第二个参数以指定编码方式(如 utf-8 )
有更加方便的文件读写: FileReader 和 FileWriter, 但很少用. 使用如下:

```Java
//读
BufferedReader reader = new BufferedReader (new FilerReader("a.txt"));
......
//写
BufferedWriter writer = new BufferedWriter(new FileWriter("a.txt")); 
```

除了以上读取的方式, 当然也可以用 Scanner, 在 InputStream 或者 Reader 的基础上建立一个 Scanner 对象, 就可以从流中的文本解析出各种基本类型.

+ Stream/Reader/Scanner 的选择

    ![](https://npm.elemecdn.com/rikka-os@1.0.3/img/Java_abc_06.assets/6af82e48946153dcbf2593e2e75c78e90fd2c556.webp)

## 5. 对象序列化

### 1. **步骤**

1. 创建 FileOutputStream
2. 创建 ObjectOutputStream
3. 写入对象
4. 关闭 ObjectOutputStream

```java
ObjectOutputSream os = new ObjectOutputSream(new FileOutputStream());
os.writeObject(characterOne);
os.close();
```

### 2.注意事项

+ 如果想要让类能够序列化, 要实现 Serializable 接口 ( 只声明即可 )
+ 如果对象的,某个祖先类不可序列化, 那么这个不可序列化的类以及它的子孙的构造函数将会执行, 全部回归初始状态
+ 静态变量不会被序列化, 而是一直维持原来状态
+ 使用 transient 关键字来阻止某个变量被序列化, 还原时会自动被赋值为默认值
