---
title: "Java 基础(十一)  异常"
tag: 'Java'
category: 教程
date: 2020-12-27
---
## 1. 捕获异常的机制

``` JAVA
try {
    //可能产生异常的代码
} catch (Type1 id1) {
    //处理 Type1 异常的代码
} catch (Type2 id2) {
    //处理 Type2 异常的代码
}
```

异常机制的最大好处: **清晰地分开了处理正常的业务逻辑代码和遇到情况时的代码**
Java 中用```try{}```来包裹可能出现异常的代码块, 并用 ```catch(Type id){}```捕捉并处理异常.

### 流程图

![](https://npm.elemecdn.com/rikka-os@1.0.3/img/Java_abc_06.assets/5f17000f52d00a439d9ffaba08d4bc6a9a1fb3a4.webp)

## 2. 捕捉到的异常

在 ```catch(type id){}```的代码块中, 可以调用 id 的 一些方法, 比如```getMessage()```, ```printStackTrace()``` 来获得相关的信息.
如果在当前层面上无法全部处理, 可以通过 ```throw``` 再次将异常抛向上一层  

+ **有风险、可能会抛出异常的代码**

```Java
//必须声明它会抛出 BadException
public void takeTisk() throws BadException {
    if(abandonallHopes) {
        //创建 Exception 对象并抛出
        throw new BadException();
    }
}
```

+ **调用该方法的程序代码**

``` Java
public void crossFingers() {
    //如果不用 try - catch包裹起来, 就必须声明 throws BadException  
    try {
        anObject.takeRisk();
    } catch (BadException ex) {
        System.out.println("Aaargh");
        ex.printStackTrace();
    }
}
```

## 3. 什么东西可以扔出来

+ 任何继承了 Throwable 类的对象
+ Exception 类继承了 Throwbale
  + throw new Exception();
  + throw new Exception("Something");

## 4. catch 是怎样捕捉异常的

+ 抛出子类的异常会被捕捉父类异常的 catch 捕捉到, 如 ```catch(Exception e){}```会捕捉到所有的异常

### 运行时刻异常

+ 像 ArrayIndexOutOfBoundsException 这样的异常**不需要声明**

## 5. 异常遇到继承

父类中的某个 Method 在子类中覆盖时, 必须保证子类中的同名方法**不声明更多的异常抛出**
子类的构造器中必须声明父类的**全部异常**
