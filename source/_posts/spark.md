---
title: docker-compose 搭建最简单的 Spark 集群
date: 2022-06-17 17:06:07
description: 用 docker 搭建 spark 非常快捷 
tag: spark 
categories: 教程
--- 
用 docker 起一个 spark 集群非常快捷, 几乎无需做任何配置. 

## docker-compose 搭建伪分布式 standalone 集群

docker-compose 内容如下

```yaml
version: '3.3'
services:
  spark:
    restart: always
    image: docker.io/bitnami/spark:3
    environment:
      - SPARK_MODE=master
      - SPARK_RPC_AUTHENTICATION_ENABLED=no
      - SPARK_RPC_ENCRYPTION_ENABLED=no
      - SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no
      - SPARK_SSL_ENABLED=no
    volumes:
      - ./spark:/opt/share  # 自己定, 可以把要提交的 spark jar 包放在 ./spark 目录
    ports:
      - '7077:7077' # master 端口
      - '8080:8080' # webui
    
  spark-worker:
    restart: always
    image: docker.io/bitnami/spark:3
    environment:
      - SPARK_MODE=worker
      - SPARK_MASTER_URL=spark://spark:7077 # 设置 master
      - SPARK_WORKER_MEMORY=1G # 设置 worker 结点的内存
      - SPARK_WORKER_CORES=1 # 设置 worker 节点的核心数
      - SPARK_RPC_AUTHENTICATION_ENABLED=no
      - SPARK_RPC_ENCRYPTION_ENABLED=no
      - SPARK_LOCAL_STORAGE_ENCRYPTION_ENABLED=no
      - SPARK_SSL_ENABLED=no
    volumes:
      - ./spark:/opt/share # 自己定, 可以把要提交的 spark jar 包放在 ./spark 目录
```
启动方式: `docker-compose up spark spark-worker --scale spark-worker=3` 即在本机启动一个 master 结点和 三个 worker 结点

启动后可以看到


## 提交任务

在容器内运行命令 `spark-submit --class {此处是 jar 包的 mainclass} --deploy-mode {部署模式, 如果设置了 master 默认为 client}  --master {spark master 的 url} {jar 包位置}`, 如 `spark-submit --class WordCount --deploy-mode client --master spark://spark:7077 /opt/sahre/wordcount.jar` .

关于 `--deploy-mode`
- local: 代码内和提交命令内均不设置 master, 此时不会在集群内运行, 即 local 模式
- client: driver 进程在提交的结点内启动
- cluster: driver 在集群中的 worker 中选择一个启动 driver 进程


更多的参数可以在 https://spark.apache.org/docs/latest/spark-standalone.html 找到.


