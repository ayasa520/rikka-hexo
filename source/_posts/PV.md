---
title: 并发程序设计--信号量与 PV 操作
date: 2022-01-21 21:29:35
description: 信号量与 PV 操作, 比起管程来讲好理解
tag: ['操作系统','PV 操作']
categories: 'NJU笔记'
---

## 问题背景

### 并发程序设计基本概念

#### 并发程序设计

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220120235646-xhxpui4.png)


#### 临界资源与临界区, 同步与互斥

临界资源: 并发程序之间需要**互斥使用的共享资源**

* 如: 火车上的卫生间
* 使用**共享变量代表共享资源**
* 并发进程中与**共享变量有关的程序段叫"临界区"**(critical section)
* 临界区: 并发进程之间**控制共享资源使用的程序段**

### "忙式等待"解决临界区调度问题的缺点

* 临界区管理的简单方法 (忙式等待/反复测试)
  * 关中断
  * 测试并建立指令
  * 对换指令
  * Peterson 算法
* 问题
  * 对于不能进入临界区的进程, 采用忙式等待测试法, 浪费 CPU 时间
  * 将测试能否进入临界区的责任交给各个竞争的进程, 削弱了系统的可靠性, 加重了用户编程负担. (这让我想起了去年的 CPP 高级程序设计, 飞机调度不就是这个问题吗? 但是那时候我是一点都不懂并发程序设计啊....)
* 通用的解决方案: 信号量与 PV 操作

### 知识框架

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121003156-7v0fg7t.png)

## PV 操作的基本原理

### 简介

* 荷兰语“检测(Proberen)”和“增量(Verhogen)”
* 信号量(semaphore)

### 信号量与 PV 数据结构和原语操作

#### 信号量数据结构定义

设 s 是一个记录型数据结构, 一个分量为 int value, 另一个为信号量队列 queue

* **P(s)**: 信号量 s 减一, 若结果小于零, 说明调用者拿不到资源, 进入等待信号量 s 的状态, 同时移入 s 的等待队列.
* **V(s)**: 信号量 s 加一, 若结果不大于零, 说明此时仍有等待资源的进程, 从 s 的等待队列中释放(唤醒)一个进程, 将其转换为就绪态.
* **原语**: CPU 处于内核态, 在关中断环境下执行的一段指令序列.原子性: 不被中断, 确保安全环境下执行的一段指令序列( ~~OS 的 Lab4 我好像没注意关中断?~~是我多虑了, 仔细看了一下, 中断处理时候本来就关了中断)

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121014134-7dfym11.png)


#### 我的信号量和 PV 的代码实现

```c
typedef enum {
    RUNNABLE, // 就绪, 位于就绪队列队首的进程为执行态
    TIMED_WAITING,// 
    WAITING,
    BLOCKED
} STATE;
// 数组实现的队列
typedef struct s_queue{
    PROCESS* procs[NR_TASKS]; // 存放进程指针的数组, NR_TASKS 为进程数(在此次实验中未严格区分用户进程和系统任务)
    int begin;                // 队首
    int length;               // 队尾
} QUEUE;

// 信号量
typedef struct s_semaphore {
    int value; // 信号量的值
    QUEUE queue; //等待队列
} SEMAPHORE;

void enqueue(QUEUE *q,PROCESS*proc){
    q->procs[(q->begin+q->length++)%NR_TASKS] = proc;
}

PROCESS* dequeue(QUEUE*q){
    PROCESS* p;
    q->length--;
    p = q->procs[q->begin];
    q->begin = (q->begin+1)%NR_TASKS;
    return p;
}

void P(SEMAPHORE*s){
    // 资源足够的话直接走了
    if(--(s->value)>=0){return;}
    // 当前进程设为阻塞, 移出就绪队列, 移入 s 的等待队列
    p_proc_ready->state=BLOCKED;
    dequeue(&readyQueue);
    enqueue(&(s->queue),p_proc_ready);
    // 立即调度
    schedule();
}
void V(SEMAPHORE*s){
    if(++(s->value)>0){
	// 这说明没有进程正在等待这个资源
        return;
    }
    // 唤醒阻塞的进程
    PROCESS*p = dequeue(&(s->queue));//队首可获得资源
    p->state = RUNNABLE;
    enqueue(&readyQueue,p);
    schedule();
}

```

### 信号量与进程状态转换模型及其队列模型

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121020423-aoqv8l7.png)

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121020433-m1fp9vh.png)

### 信号量与 PV 操作的推论

1. s 为正数, 该值等于封锁进程前信号量 s 还可以施行的 P 操作次数, 也等于 s 所代表的世纪还可以使用的物理资源数
2. s 为负数, 绝对值等于在 s 的等待队列中排队的进程数
3. P 代表请求一个资源, V 代表释放一个资源; 一定条件下, P 代表阻塞进程操作, V 代表唤醒被阻塞进程操作

## 信号量程序的一般结构

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121114428-6a5xw7x.png)

### PV 求解互斥问题

#### 哲学家就餐问题

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121114655-twtwy1o.png)

1. 最多只有 4 名哲学家同时取叉子
    ```c
    semaphore forks[5];
    for(int i=0; i<5; i++)
        fork[i]=1;
    semaphore r=4; // 计数, 最多允许 4 个
    
    process philosopher(int i){ // i=0,1,2,3,4
        while(1){
            think();
            hungry();
            P(r); // 最多允许 4 个人取叉子
            P(fork[i]); // 请求右手边的叉子
            P(fork[(i+1)%5]; // 请求左手边的叉子
            eat();
            V(fork[i]);
            V(fork[(i+1)%5]; 
            V(r);
    }
    ```
2. 每次只允许一个人拿左右叉子
    ```c
    semaphore forks[5];
    for(int i=0; i<5; i++)
        fork[i]=1;
    semaphore mutex = 1; // 互斥量
    
    process philosopher(int i){ //i=0,1,2,3,4
        while(1){
            think();
            hungry();
            P(mutex);
            P(fork[i]); // 请求右手边的叉子
            P(fork[(i+1)%5]; // 请求左手边的叉子
            V(mutex); // 释放, 因为允许多个哲学家同时吃饭
            eat();
            V(fork[i]);
            V(fork[(i+1)%5];
        }
    }
    ```

3. 偶数的哲学家先右后左, 奇数哲学家先左后右
    ```c
    semaphore forks[5];
    for(int i=0; i<5; i++)
        fork[i]=1;
    
    process philosopher(int i){ //i=0,1,2,3,4
        while(1){
            if(i%2){
                // 奇数
                P(fork[(i+1)%5]; // 请求左手边的叉子
                P(fork[i]); // 请求右手边的叉子
                eat();
                V(fork[i]);
                V(fork[(i+1)%5]; 
            } else {
                // 偶数
                P(fork[i]); // 请求右手边的叉子
                P(fork[(i+1)%5]; // 请求左手边的叉子
                eat();
                V(fork[i]);
                V(fork[(i+1)%5]; 
            }
        }
    }
    ```

### PV 求解同步问题

#### 生产者与消费者问题

无论是怎样的套路都差不多, 每生产几个产品才拿一个, 多个缓冲单元, 多级生产者消费者什么的... 对于一组生产者消费者, 设置一个 empty 信号量, 表示缓冲区尚能放几次产品; 一个 full 信号量, 表示缓冲区中可以取几次产品. 

涉及到计数量的变化, 需要互斥.

例子: 多个生产者, 多个消费者, k 个缓冲单元, 生产者每次放一个产品, 消费者每次拿一个

```c
semaphore empty = k; // 尚能放 k 此产品
semaphore full = 0; // 一开始缓冲区为空

// 缓冲区可以当成一个队列, 每个单元可以认为是独立的, 所以此处不必生产者和消费者互斥, 但是
// 如果像仓库问题限制同时使用缓冲区的进程数, 那么还得加一个互斥量
int head = 0;
int tail = 0;
Product buf[k];
semaphore mutex1 = mutex2 = 1; // 生产者之间, 消费者之间互斥

//m 个生产者
process producer(){
  while(true){
        product = makeProduct();
        P(empty);    // 有位置才能放
        P(mutex1);
        head = (head+1)%k;
        buf[head] = product;
        V(mutex1);
        V(full);    // 通知消费者可以拿东西
    }
}

// n 个消费者
process cosumer(){
    while(true){
        P(full);    // 有东西才能拿
        P(mutex2);
        product = buf[tail];
        tail = (tail+1)%k;
        V(empty);    // 通知生产者可以放东西
        V(mutex2);
    }
}

```

### 橘子苹果问题, 农夫猎人问题, 吸烟者问题

感觉差不多是生产者消费者问题的变种, 特点是特定的消费者消费特定的生产者, 那么只需针对不同的产品设定不同的信号量即可

```c
semaphore sp = 1; // 盘子里放 1 个水果
semaphore s1 = s2 = 0; // 盘子里有 0 个苹果, 0 个橘子

process father(){
    P(sp);
    // 放橘子
    V(s2);
}
process mother(){
    P(sp);
    // 放苹果
    V(s1);
}
process daughter(){
    P(s2);
    // 吃橘子
    V(sp);
}
process son(){
    P(s1);
    // 吃苹果
    V(sp);
}
```

![image.png](https://unpkg.com/rikka-os2@1.0.6/img/image-20220121210021-lc7i7qw.png)

```c
semaphore empty = 1; // 香烟供应者一开始可以放一次
semaphore s1=s2=s3=0; // 三个人都不能拿
process producer(){
    // 一共就三种情况, 放烟草火柴, 火柴纸,或者烟草纸
    int i=RAND()%3;
    P(empty);
    switch(i){
    case 0:
        V(s1);
    break;
    case 1:
        V(s2);
    break;
    case 2:
        V(s3);
    break;
    }
}
// 吸烟者
process consumer(){
    // 三个吸烟者 P 的信号不一样
    P(s_k); 
    // 拿东西组装烟
    V(empty);
}
```
