---
title: Docker 入门笔记
date: 2021-08-21 11:02:13
description: Docker 基础知识.框架来源于 BV1og4y1q7M4,部分内容翻译自 docs.docker.com
tag: ['docker']
categories: "教程"

---

## Docker 概述

容器化, 每个容器隔离. 不是模拟一个完整的操作系统. 容器没有自己的内核

Docker 将环境打包在一起

- 应用更快速的交付和部署
  - 打包镜像, 一键运行
- 更便捷的升级和扩缩容
  - 打包镜像, 轻易扩展
- 更简单的系统运维
  - 开发测试环境一致 {% blur 明明在我的电脑上能运行的! %}
- 更高效的计算资源利用
  - 内核级别虚拟化, 压榨性能

## Docker 的基本组成

- 镜像 (image)
  - 如同模版, 镜像--run-->容器, 一个镜像可以创建多个容器
- 容器(container)
  - 独立运行一个或者一个组应用
  - 基本命令启动, 停止, 删除
- 仓库(Registry)
  - 存放镜像的地方(Dockerhub)

- 客户端 (Client)
  - 向服务器发送请求, 支持很多命令
- 服务器 (Server)
  - Docker daemon: 服务器组件, linux 后台服务, 负责创建、运行、监控容器, 构建、存储镜像

## Docker 的原理

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="651px" viewBox="-0.5 -0.5 651 391" content="&lt;mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2021-08-21T09:47:03.911Z&quot; agent=&quot;5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.25 Safari/537.36 Edg/93.0.961.18&quot; etag=&quot;7ILsMg1X0zZKV7KpU8NY&quot; version=&quot;14.9.8&quot; type=&quot;onedrive&quot;&gt;&lt;diagram id=&quot;wv3MTlDOFZQuBFDyb-kY&quot; name=&quot;Page-1&quot;&gt;5ZhNj5swEIZ/DcetAg4Ejt0kbVVtpao5bPdowRS8NQx1zAb662uK+YqzUdptEla9RPbL2NjP+J1YWGSZlu8FzZNPGAG3nFlUWmRlOU4QzNRvLVSNYC/mXqPEgkVa64UN+wla1APjgkWwHQVKRC5ZPhZDzDII5UijQuBuHPYN+fitOY3BEDYh5aZ6zyKZNKrvLHr9A7A4ad9se0HzJKVtsN7JNqER7gYSWVtkKRBl00rLJfAaXsulGffumafdwgRk8pQBDx/5j/U9BCU+Fl5+t2SrL+sbPcsT5YXesF6srFoCAossgnqSmUVudwmTsMlpWD/dqZwrLZEpVz1bNfV0ICSUz67T7navjg1gClJUKqQdsNDA9JG5aY/CrufvuVpLBuxJe9ioznnczd1jUQ1N5g8oOdOj1BmkNZYJyT0EyfHOBaldwQAKRMpLuotCJhhjRvm6V2/H2PqYO8Rcw3oEKStdGGgh8RDK+kXHQap1YSFCOLIBossLFTHII3He4cQI4FSyp/E6DlH+PfStELQaBOTIMrkdzPy5Fvp8k/k4346/5/a9+LnvHotXjWYFfb67rfz9ESCGT5ac1Xm4ulv8MT0yM+1iOwfscj632AaUC7hF4RLV13r8G7ftPgyfrUo9edOrdO8fusydsss85xW4zJ2qy1xvci4z/6j/D5d5J7ps8UKXvSw75JXfGE6lHFyTsmeUixWG30EobUUhxezqdcMJ9u6yvlk3usv9RerGwiyxmEnKshrbxGi5JxZZe3YuWr5B6+qQ3PnUIAUTPlKXpKW6/TeP5krUfzki618=&lt;/diagram&gt;&lt;/mxfile&gt;" onclick="(function(svg){var src=window.event.target||window.event.srcElement;while (src!=null&amp;&amp;src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null){if(svg.wnd!=null&amp;&amp;!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&amp;&amp;evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);svg.wnd=window.open('https://viewer.diagrams.net/?client=1&amp;page=0&amp;edit=_blank');}}})(this);" style="cursor:pointer;max-width:100%;max-height:391px;"><defs/><g><rect x="0" y="0" width="650" height="390" fill="#ffffff" stroke="#000000" pointer-events="all"/><rect x="40" y="20" width="550" height="260" fill="#ffffff" stroke="#000000" pointer-events="all"/><path d="M 170 310 L 170 290 L 315 290 L 315 256.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 315 251.12 L 318.5 258.12 L 315 256.37 L 311.5 258.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><rect x="110" y="310" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 340px; margin-left: 111px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Client</div></div></div></foreignObject><text x="170" y="344" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Client</text></switch></g><path d="M 450 310 L 450 290 L 315 290 L 315 256.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 315 251.12 L 318.5 258.12 L 315 256.37 L 311.5 258.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><rect x="390" y="310" width="120" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 340px; margin-left: 391px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Client</div></div></div></foreignObject><text x="450" y="344" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Client</text></switch></g><path d="M 315 190 L 315 170 L 180 170 L 180 166.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 180 161.12 L 183.5 168.12 L 180 166.37 L 176.5 168.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><path d="M 315 190 L 315 170 L 430 170 L 430 166.37" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 430 161.12 L 433.5 168.12 L 430 166.37 L 426.5 168.12 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><rect x="120" y="190" width="390" height="60" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 388px; height: 1px; padding-top: 220px; margin-left: 121px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Docker Daemon</div></div></div></foreignObject><text x="315" y="224" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Docker Daemon</text></switch></g><rect x="120" y="60" width="120" height="100" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 110px; margin-left: 121px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Container</div></div></div></foreignObject><text x="180" y="114" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Container</text></switch></g><rect x="370" y="60" width="120" height="100" fill="#ffffff" stroke="#000000" pointer-events="all"/><rect x="370" y="60" width="120" height="100" fill="#ffffff" stroke="#000000" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 110px; margin-left: 371px;"><div style="box-sizing: border-box; font-size: 0; text-align: center; "><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; white-space: normal; word-wrap: normal; ">Container</div></div></div></foreignObject><text x="430" y="114" fill="#000000" font-family="Helvetica" font-size="12px" text-anchor="middle">Container</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://www.diagrams.net/doc/faq/svg-export-text-problems" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>

Docker 为什么比虚拟机更快: 更少的抽象层

## Docker 常用命令

### 帮助命令

```bash
docker version		
docker info			# docker 系统信息 
docker 命令 --help
```

### 镜像命令

1. docker images

   ```bash
   ❯ docker images
   REPOSITORY                TAG             IMAGE ID       CREATED        SIZE
   hagb/docker-easyconnect   cli             f3c06cd4a55c   4 weeks ago    117MB
   hagb/docker-easyconnect   vncless-7.6.3   e9d950d9c373   4 weeks ago    373MB
   hello-world               latest          d1165f221234   5 months ago   13.3kB
   ```

   ```bash
   # 可选项
       -a, --all # 显示所有的镜像
       -q, --quiet # 只显示 id
   ```

   

2. docker search 搜索镜像

   ```bash
   --filter # 过滤
   ```

   

3. docker pull 下载镜像

   ```bash
   # docker pull 镜像名[:tag] 默认下载最新版
   ❯ docker pull mysql:5.7
   5.7: Pulling from library/mysql
   e1acddbe380c: Pull complete 		# 分层次下载, 如果已经存在则不需要重新下载, 节省内存
   bed879327370: Pull complete 
   03285f80bafd: Pull complete 
   ccc17412a00a: Pull complete 
   1f556ecc09d1: Pull complete 
   adc5528e468d: Pull complete 
   1afc286d5d53: Pull complete 
   4d2d9261e3ad: Pull complete 
   ac609d7b31f8: Pull complete 
   53ee1339bc3a: Pull complete 
   b0c0a831a707: Pull complete 
   Digest: sha256:7cf2e7d7ff876f93c8601406a5aa17484e6623875e64e7acc71432ad8e0a3d7e
   Status: Downloaded newer image for mysql:5.7
   docker.io/library/mysql:5.7			# 真实地址
   ```

4. docker rmi 删除

   ```bash
   docker rmi -f $(docker images -aq) 	# 删除所有镜像
   ```

5. docker commit 提交容器

   ```bash
   docker commit -m="message" -a="author" CONTAINER NAME[:TAG] # 将容器保存为新的副本
   ```

   

### 容器命令 

以 centos 为例

```bash
docker pull centos
```

1. 新建容器并启动

   ```bash
   docker run [可选] image# 参数说明--name="Name"	# 容器名字-d				# 后台方式运行. 如果没有前台进程, docker 会自动停止后台应用-it				# 使用交互方式运行, 进入容器查看内容-p				# 指定容器的端口 	-p ip 主机端口:容器端口	-p 主机端口:容器端口(常用)	-p 容器端口	容器端口-P				# 随机指定端口
   ```

   举例:

   ![image-20210822002154977](https://onedrive.bilibilianime.com/ali/image/image-20210822002154977.png)

2. 列出所有运行的容器

   ```bash
   docker ps [OPTIONS]Options: 	-a: 列出所有容器(默认是正在运行的)	-n=?: 显示最近创建的容器	-q: 只显示容器的编号
   ```

   

3. 退出容器

   ```bash
   exit # 停止运行并退出容器Ctrl+P+Q # 不停止退出容器
   ```

4. 删除容器

   ```bash
   docker rm 容器iddocker rm -f $(docker ps -aq)docker ps -aq | xargs docker rm
   ```

5. 启动和停止容器

   ```bash
   docker start iddocker restart iddocker stop iddocker kill id
   ```

   

6. 其他

   ```bash
   docker exec -it ID /bin/bash 	# 进入正在运行的容器, 开启新的终端docker attach ID				# 进入正在执行的终端, 不开启新的docker logs	ID	 			 	# 查看日志docker top ID 				 	# 查看容器内进程 docker inspect ID   			# 查看容器元数据docker cp ID:SRC_PATH DEST_PATH # 拷贝文件
   ```

   ### 练习

   1. 部署 nginx

      ```bash
      docker pull nginx docker run -d --name nginx01 -p 3344:80 nginx	# 后台运行, 80端口映射到宿主机 3344 端口docker exec -it nginx01 /bin/bash 				# 进入容器内部
      ```

      每次改配置文件, 都要进如容器很麻烦——使用<a href="#%E5%AE%B9%E5%99%A8%E6%95%B0%E6%8D%AE%E5%8D%B7">**数据卷** </a>

   2. 部署 tomcat

      ```bash
      docker run -it --name   tomcat01 -p 3355:8080  tomcat 
      ```

      从宿主机的 3355 端口访问可以看到

      ![image-20210823212242546](https://onedrive.bilibilianime.com/ali/image/image-20210823212242546.png)

      3. 部署 elasticsearch + kibana

         ```bash
         docker run -d --name es -p 9200:9200 -p 9300:9300  -e "discovery.types=single-node" -e ES_JAVA_OPS="-Xms64m -Xmx512m" elasticsearchUnable to find image 'elasticsearch:latest' locally # 限制最小最大内存docker stats # 查看 CPU 和内存占用
         ```

         两个服务部署在两个容器, 如何对接?

         

### 可视化

- portainer (无用)

  ```bash
  docker run -d -p 8088:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
  ```

  

- Rancher

## Docker 镜像

### 镜像是什么

镜像是一种轻量级的、可以独立执行的独立软件包, 用来打包软件运行环境和运行环境开发的软件, 它包含某个软件运行需要的全部内容, 包括环境变量、代码、运行时库和配置文件 

### Docker 的组成

![Docker组成](http://static.open-open.com/lib/uploadImg/20150825/20150825141358_122.png "http://static.open-open.com/lib/uploadImg/20150825/20150825141358_122.png")

#### Docker 镜像加载原理

典型的 Linux 文件系统由 **bootfs** (boot file system) 和 **rootfs**(root file system) 组成.

bootfs: 包含 bootloader 和 kernel. bootloader 负责引导加载 kernel. 内核加载进内存后 bootfs 被卸载

rootfs: Linux 系统中的 /dev, /proc, /etc 等标准目录和文件

Docker 镜像建立在 AUFS (一种 UnionFS) 之上, UnionFS 支持对文件系统的修改作为一次提交来一层层叠加, 同时可以将不同目录挂载到同一个虚拟文件系统下.UnionFS 一次加载多层**只读 (read only)**的 rootfs, 但从外面看来只能看到一个 rootfs. 联合加载 (union mount) 的这些叠加起来的 roofts 就是 Docker 镜像. 镜像实例化后会分配一层空的 read-write 的 roofts==>**容器层**.



## 卷

以下部分内容节选并翻译自 https://docs.docker.com/storage/volumes/

**卷** (volumes)是持久化由 Docker 容器产生和使用的数据的首选机制. **绑定挂载** ([bind mounts](https://docs.docker.com/storage/bind-mounts/)) 依赖于目录结构以及宿主机的操作系统, 而卷完全由 Docker 管理. 相比绑定挂载, 卷有以下几个优点:

- 卷更加容易备份和迁移
- 可以使用 Docker CLI 命令或者 Docker API 来管理卷
- 卷在 Linux 和 Windows 系统均可工作
- 卷驱动允许将卷存储在远程主机或是云提供商, 以加密卷的内容或是添加其他功能
- 新的卷可以由容器预填充内容
- Docker Desktop 上的卷比 Mac 和 Windows 宿主机上的绑定挂载具有更高的性能

> 绑定挂载 (bind mounts) 在命令上与卷 (volumes)很相似, -v 三个字段为: 宿主机目录, 容器内挂载目录和读写权限(可选). 

如果容器生成非持久状态数据, 请考虑使用 tmpfs mount, 以避免永久地将数据存储在什么地方, 并通过避免对容器的可写层 (writable layer) 写入来提升容器性能.

![volumes on the Docker host](https://docs.docker.com/storage/images/types-of-mounts-volume.png)

### 选择 -v 或者 --mount 标志

一般来讲, `--mount` 更明确详细, 最大的区别是 `-v` 将所有的选项合并在一个字段, `--mount` 则是分开的. 下面是两种语法的比较.

如果你想具体指定卷驱动的选项, 必须使用 `--mount`.

- `-v` 或者 `--volume`: 由三个字段组成, 由冒号 ( : ) 分隔.字段中的顺序必须正确, 并且每个字段的含义并不是显而易见的.
  - 在**具名卷** (named volumes) 的情况下, 第一个字段是卷名, 这在宿主机上是唯一的. 对于**匿名卷** (omitted volumes), 第一个字段被省略.
  - 第二个字段是容器内被挂载文件或者目录的路径
  - 第三个字段是可选的, 比如 `ro` `rw`
- `--mount`: 由多个键值对组成, 由逗号分隔, 每个键值对由 `<key>=<value>`  的元组组成. `--mount` 语法更加详细, 但是键的顺序不重要, 这个标志的值也更容易理解.
  - 挂载的**类型** `type`, 可以是 `bind`, `volume` 或者 `tmpfs`. 此处讨论卷, 所以 type 永远为 `volume`.
  - 挂载的**来源** `source`. 对于具名卷来说是卷名, 对于匿名卷来说该字段被省略. 可以指定为 `source` 或者 `src`.
  - 挂载的**目标**  `destination` , 是容器内被挂载文件或者目录的路径. 可以被指定为 `destnation`, `dest`, `target`
  - **只读**可选选项 `readonly`, 这个选项会使卷以只读的方式挂载到容器中.
  - `volume-opt` 选项, 可以被多次指定, 采用由选项名和值组成的键值对.

#### `-v` 和 `--mount` 的不同

和绑定挂载不同, 卷中的所有选项都可以用于 `--mount` 和 `-v` 标志.

当卷与服务一起使用时, 支持 `--mount`.

### 创建和管理卷

与绑定挂载不同, 在容器外可以创建和管理卷.

**创建一个卷:**

```bash
docker volume create my-vol
```

**列出所有的卷:**

```bash
docker volume ls
```

```
local			my-vol
```

**查看某个卷的元数据:**

```bash
docker volume inspect my-vol
```

```
[    {        "Driver": "local",        "Labels": {},        "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",        "Name": "my-vol",        "Options": {},        "Scope": "local"    }]
```

**删除一个卷:**

```bash
docker volume rm my-vol
```

### 启动一个带有卷的容器

启动容器时如果指定的卷不存在, Docker 会自动创建这个卷. 下面的例子将卷 `myvol2` 挂载到了容器内的 `/app/`目录.

`-v` 和 `--mount` 在示例中的结果相同, 选择其中一种运行.

{% tabs code %}
<!-- tab --mount-->

```bash
docker run -d \  --name devtest \  --mount source=myvol2,target=/app \  nginx:latest
```

<!-- endtab -->

<!-- tab -v-->

```bash
docker run -d \  --name devtest \  -v myvol2:/app \  nginx:latest
```

<!-- endtab -->
{% endtabs %}

使用 `docker inspect devtest` 来确认卷被正确地创建和挂载了, 看下面的 `Mounts` 部分:

```bash
"Mounts": [    {        "Type": "volume",        "Name": "myvol2",        "Source": "/var/lib/docker/volumes/myvol2/_data",        "Destination": "/app",        "Driver": "local",        "Mode": "",        "RW": true,        "Propagation": ""    }]
```

这表明挂载的是一个卷, 显示了正确的源和目标, 并且挂载是可读可写的.

停止容器并移除卷. 移除卷是单独的步骤:

```bash
docker container stop devtestdocker container rm devtestdocker volume rm myvol2
```

### 使用只读卷

对于一些开发应用程序, 容器需要写入卷, 以便将变化传回宿主机. 其他时候, 容器只需要读取数据. 记住多个容器可以挂载同一个卷, 并单独设置每个容器的读写权限.


{% tabs code %}
<!-- tab --mount-->

```bash
docker run -d \  --name=nginxtest \  --mount source=nginx-vol,destination=/usr/share/nginx/html,readonly \  nginx:latest
```

<!-- endtab -->

<!-- tab -v-->

```bash
docker run -d \  --name=nginxtest \  -v nginx-vol:/usr/share/nginx/html:ro \  nginx:latest
```

<!-- endtab -->
{% endtabs %}

查看元数据 `docker inspect nginxtes` 的 `Mounts` 部分:

```
"Mounts": [    {        "Type": "volume",        "Name": "nginx-vol",        "Source": "/var/lib/docker/volumes/nginx-vol/_data",        "Destination": "/usr/share/nginx/html",        "Driver": "local",        "Mode": "",        "RW": false,        "Propagation": ""    }],
```

停止容器并移除卷:

```bash
docker container stop nginxtestdocker container rm nginxtestdocker volume rm nginx-vol
```

### 数据卷容器

通过数据卷容器来共享数据. `--volumes-from` 可以从其他已经挂载卷的容器挂载数据卷, 但不可对挂载位置, 读写权限进行修改. 同一个容器可以指定多个 `--volumes-from`.

```bash
docker run -d -v /app --name test nginx		# 创建数据卷容器docker run -d --volumes-from test --name test01 nginx	
```

### 备份, 恢复或迁移数据卷

使用 `--volumes-from`. 略



## Dockerfile

Dockerfile 是用来构建 docker 镜像的构建文件, 里面写脚本. 每个命令都是镜像的一层

例子:

```bash
FROM centosVOLUME ["/volume01","/volume02"]		#  创建两个匿名的数据卷挂载到 volume01 和 volume0CMD echo "---end---"					# 打印一些信息
```

### 基础知识

1. 每个保留关键字(指令) 都必须是大写字母.
2. 执行从上到下顺序执行.
3. \# 表示注释,
4. 每一个指令都会创建并提交一个新的镜像层. 

### Dockerfiler 指令

```dockerfile
FROM ImageName			 # 指定基础镜像MAINTAINER <name>		 # 维护者,已过时,应使用 LABELRUN <command>			 # 镜像构建的时候运行的命令COPY [--chown=<user>:<group>] <src>... <dest>	# 官方推荐使用,类似于 ADDADD						 # COPY 文件,自动解压 tarWORKDIR /path/to/workdir # 制定当前的工作目录VOLUME ["/data"]		 # 设置卷,挂载到容器目录,可以用 -v 修改挂载点EXPOSE <port> [<port>/<protocol>...] # 暴露端口,随机映射 -P 会用到此处指定的端口CMD <command> 			 # 容器启动时运行的命令ENTRYPOINT <command>     # 容器启动时运行的命令ONBUILD <command>		 # 本次不执行.当该镜像被 FROM 时执行ENV <key> <value>ENV <key>=<value1> <key2>=<value2> # 指定环境变量
```

**`CMD` 与 `ENTRYPOINT` 的不同：**

`CMD` 的具体用法：

```dockerfile
CMD <command> 						# 执行 shell 命令CMD ["<command>","<param1>","<param2>",...] # 推荐写法CMD ["<param1>","<param2>",...] 	# 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
```

dockerfile 中存在多个 `CMD` 时,只会执行最后一个.可以被 `docker run` 的命令行参数**覆盖**.

`ENTRYPOINT` 的具体用法：

```dockerfile
ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
```

与 `CMD` 类似,但是不会被 `docker run` 的命令行参数覆盖,而是会将 `docker run` 的命令行参数传给 `ENTRYPOINT` .可以与 `CMD` 搭配使用.

举个例子：

```dockerfile
FROM nginxENTRYPOINT ["nginx", "-c"]CMD ["/etc/nginx/nginx.conf"]
```

- 不传参运行

  ```bash
  docker run nginx:test
  ```

  容器内执行

  ```bash
  nginx -c /etc/nginx/nginx.conf
  ```

- 传参执行

  ```bash
  docker run nginx:test -c /etc/nginx/new.conf
  ```

  容器内执行

  ```bash
  nginx -c /etc/nginx/n.conf
  ```

  


写好 dockerfile 后,用 `docker build` 构建一个叫做 `my-centos` 的镜像：

```
docker build -f Dockerfile -t my-centos:0.1 .
```



一个具体的 Dockerfile

```dockerfile
FROM centosMAINTAINER rikka@rikka.comCOPY README.md /usr/local/README.mdADD ./jdk-8u301-linux-x64.tar.gz /usr/local/ADD ./apache-tomcat-9.0.52.tar.gz /usr/local/RUN yum -y install vimENV MYPATH /usr/localENV JAVA_HOME /usr/local/jdk1.8.0_301ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.52ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.52ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/binWORKDIR $MYPATHEXPOSE 8080CMD $MYPATH/apache-tomcat-9.0.52/bin/startup.sh && tail -F $MYPATH/apache-tomcat-9.0.52/logs/catalina.out
```

```bash
docker build -t mytomcat:0.1			# 构建镜像docker run -d -p 8080:8080 --name tomcat -v test:/usr/local/ apache-tomcat-9.0.52/webapps/test mytomcat:0.1	       # 运行容器
```

Docker 自动创建一个叫做 `test` 的 volume 挂载到容器内的 `test` 目录, 在 `test` 内放入 web 项目即可通过 ip:8080 访问.

## Docker 小结

![查看源图像](https://static001.geekbang.org/infoq/73/731fc8043e0f71aab7851ad87427bdd6.png)



## Docker 网络

问题：宿主机是否可以 ping 通容器内 eth0 的 ip？容器之间能 ping 通吗

答：都可以, 试一下就知道

每启动一个容器, docker 就会给容器分配一个 ip, 只要安装了 docker, 就会有一个网卡 docker0 桥接模式, 使用 veth-pair 技术.

>veth-pair 是成对出现的一种虚拟网络设备接口, 一端连着网络协议栈, 一端彼此相连. 它充当一个桥梁, 连接各种虚拟设备
>
>![http://blog.daocloud.io/wp-content/uploads/2017/02/e5.png](http://blog.daocloud.io/wp-content/uploads/2017/02/e5.png "http://blog.daocloud.io/wp-content/uploads/2017/02/e5.png")
>
>{% blur 我知道这里说得很简略, 但现在不是深入了解 docker 网络的时候, 仅仅是做个了解 %}

![image-20210913223445243](/home/rikka/.config/Typora/typora-user-images/image-20210913223445243.png)



**过时的**: 在 `docker run` 的时候指定 `--link`, 即可将指定容器的容器名及其 ip 写入新容器的 hosts, 这样 `ping 容器名` 就可以 ping 通.

现在应该使用 **自定义网络**

### 自定义网络

- 查看所有的 docker 网络

  ```bash
  dockr network ls
  ```

  ![image-20210919145853620](/home/rikka/.config/Typora/typora-user-images/image-20210919145853620.png)

  

  | 网络模式  |                        |
  | :-------: | :--------------------: |
  |  bridge   |     桥接模式(默认)     |
  |   none    |       不配置网络       |
  |   host    |     和主机共享网络     |
  | container | 容器内网络联通(不常用) |


​    

- 创建一个网络, 桥接模式, 用 16 位表示主机号, 默认网关 192.168.0.1, 名称 mynet

  ```bash
  docker network create --driver bridge --subnet 192.168.0.0/24 --gateway 192.168.0.1 mynet
  ```

- inpect

  ```bash
  docker network inspect mynet
  ```

  ![image-20210919184556447](/home/rikka/.config/Typora/typora-user-images/image-20210919184556447.png)

- 将服务放在自己的网络中

  ```bash
  docker run -d -P --name tomcat-mynet01 --net mynet tomcat
  ```

  好处: 

  - 使用自定义网络在容器内可以直接 ping 另一个容器名
  - 隔离不同服务使用的子网

- 网络连通

  刚才创建了一个 mynet 网络, 使用 mynet 的容器是 ping 不通使用 docker0 的容器的. 所以需要用到 connet.

  如, 将 docker0 上的容器 tomcat01连接到 mynet:

  ```bash
  docker network connect mynet tomcat01
  ```

  此后, 容器 tomcat01 就拥有了两个不同的 ip 地址. 

  

