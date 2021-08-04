---
title: 自动添加 twikoo 评论中的友链
description: 基于 twikoo 实现友链自动添加, 不再需要手动更新 link.yml. 后端使用最简化的 flask
tags: ["友链","自动化","flask"]
categories: "教程"
date: 2021-07-06 02:38:38
---

{% tip warning %}
**本文已失效**
**在本文中您将会看到:**
低技术力
低效率
几乎没有的可移植性与可拓展性
{% endtip %}

唯一的优点: 对于新手 (我自己) 来说不需要掌握很多技术就能实现

## 需求

hexo 的友链页面和文章一样, 要想更新就得重新生成并部署. 使用 webhook, Github Action 或者 vercel 等实现自动化部署后, 更新网站内容变得更加方便: 本地改好后直接推送到仓库, 剩下的交给服务器去做. 但是增加友链每次都要从评论区复制粘贴到 link.yml 然后 push, 还是比较麻烦. 目前有通过 issue 添加友链的方法, 但是对于我这种懒人来讲, 能在评论区做就不想再开个网页, 所以我想要做出一点更改, 能自动获取评论中的友链信息并直接添加(**这建立在自动部署的前提上**). 关于审核什么的, 我就不关心了, 现在评论一共都没多少


## 思路

我的博客中评论用的是 twikoo, 云函数的代码我看不到(当然也肯定看不懂), 于是就只剩下 JS 了, 简单 F12 看一下, 发现点击`发送`按钮后, twikoo.all.js 会给 twikoo 云函数发 post 请求, 请求负载的 `request_data` 字段包含了评论内容, 评论链接等.

只需要在 twikoo.all.js 向 twikoo 云函数发送 post 请求的同时给我自己的服务器也发一个评论内容的 post 请求, 后端解析得到的 json 格式字符串, 就能提取到新增友链需要的昵称, 头像, 邮箱, 网址信息, 然后通过 Github API 更新仓库中的 `link.yml` 文件, 然后触发 webhook, 部署博客的服务器自动拉取最新的代码.

## 具体步骤

### 搭建简单的 flask 应用

flask 是一个轻量化的 web 框架, 下面是一个最简单的 flask 应用, 访问 `route()` 中的 URL 就能触发下面的函数, 它会返回一段 html 代码, 浏览器会将其渲染出来.

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

在终端中启动应用并进行本地测试, 其中 `FLASK_APP=hello`中的 hello 是 py 文件名.

{% tabs code %}
<!-- tab bash-->
```bash
export FLASK_APP=hello
flask run
```
<!-- endtab -->

<!-- tab cmd-->
```cmd
set FLASK_APP=hello
flask run
```
<!-- endtab -->

<!-- tab powershell-->
```powershell
$env:FLASK_APP = "hello"
flask run
```
<!-- endtab -->
{% endtabs %}

默认端口为 5000, 访问 localhost:5000 就可以看到 `Hello, World!`
![image](https://unpkg.zhimg.com/rikka-os@1.0.3/img/0727e9038331753410eed8905d17ba09.png)

要处理 post 请求, 只需要在 `@app.route` 装饰器里添加 `methods=['post']`, 这样这个路由就只能以 post 方式访问. `request.get_data` 可以接收 post 请求的负载.

```python
@app.route("/",methods=['post'])
def hello_world():
    print(request.get_data(as_text=True))
    
```

点击发送按钮, twikoo 会发起一个 post 请求, Request PayLoad 的内容如下:

![image](https://unpkg.zhimg.com/rikka-os@1.0.3/img/d755b87a44f31fdaed248c9795f21026.png)

从图可以看出只需要解析其中的 `comment` 字段.

`comment` 字段是 html 代码, 借助 `etree.HTML` 从 html 代码中解析文本内容. 关于如何使用 json, xpath, subprocess 工具等就不在这里赘述了.

完整的后端实现:

{% folding green, 旧版已废弃 %}
```python
from flask import Flask
from flask import request
from markupsafe import escape
from lxml import etree
from flask_cors import *
import re
import time
import subprocess
import json

app = Flask(__name__)
CORS(app, supports_credentials=True) # 允许跨域

@app.route("/",methods=['post'])
def hello_world():
    data = json.loads(request.get_data(as_text=True))
    data = json.loads(data['request_data'])
    # 检查来源, 换成自己的
    if "comment" in data and data['href'] == 'https://www.bilibilianime.com/link/':
        with open('/var/hexo_source/hexo/source/_data/link.yml','a+')as f:
            # f.write(str(data))
            dom = etree.HTML(str(data['comment']))
            # f.write(s+'\n\n')
            info = []
            try:
                info = dom.xpath("//code[@class='language-yml']//text()")
                info =  [ainfo.strip() for ainfo in info[0].split("\n")]
                # f.write(str(info))
                template = "\n\n    {}\n      {}\n      {}\n      {}"    
                f.write(template.format(info[0],info[1],info[2],info[3]))
                with open('log.txt','a+')as logfile:
                    logfile.write(time.asctime( time.localtime(time.time()))+": 新增一条友链: "+" ".join(info)+"\n")
                # link.yml 所在目录, 换成自己的
                subprocess.Popen('cd /var/hexo_source/hexo/&&git add .&&git commit -m "update: friend link"&&git push>log.txt',shell=True)
            except:
                with open('log.txt','a+')as logfile:
                    logfile.write(time.asctime( time.localtime(time.time()))+ ": 失败！"+"info: {}".format(" ".join(info))+"\n")
    
    else:
        return '<span>bad!</span>'
            
    return  '<span>ok!</span>'
```
{% endfolding %}

{% folding blue open, 使用 Github API %}
```python
from flask import Flask
from flask import request
from markupsafe import escape
from lxml import etree
from flask_cors import *
import re
import time
import subprocess
import json
import requests
import base64
import traceback


from twisted.internet import reactor
from twisted.web import proxy, server

# 此处填入你的 token
token = '' 

# 此处填入你的 link.yml 的 Github API 链接
url = 'https://API.github.com/repos/ayasa520/hexo/contents/source/_data/link.yml' 
headers = {'Authorization': 'token ' + token}

app = Flask(__name__)

# 允许跨域
CORS(app, supports_credentials=True) 




@app.route("/",methods=['post'])
def hello_world():
    data = json.loads(request.get_data(as_text=True))
    data = json.loads(data['request_data'])
    if "comment" in data and data['href'] == 'https://www.bilibilianime.com/link/':
        dom = etree.HTML(str(data['comment']))
        info = []
        try:
            info = dom.xpath("//code[@class='language-yml']//text()")
            info =  [ainfo.strip() for ainfo in info[0].split("\n")]
            template = "\n\n    {}\n      {}\n      {}\n      {}"    
            response_json = json.loads(requests.get(url, headers=headers).text)
            old_text = str(base64.b64decode(response_json['content']), encoding='utf-8')
            b64 = base64.b64encode((old_text +template.format(info[0],info[1],info[2],info[3])).encode('utf-8')).decode('ascii')
            data = {
                'message': "update from Python",
                'content': b64,
                'sha': response_json['sha']
            }            
            requests.put(url=url, data=json.dumps( data), headers=headers)
            with open('log.txt','a+')as logfile:
                logfile.write(time.asctime( time.localtime(time.time()))+": 新增一条友链: "+" ".join(info)+"\n")
        except  Exception as e:
            with open('log.txt','a+')as logfile:
                logfile.write(time.asctime( time.localtime(time.time()))+ ": 失败！"+"info: {}".format(" ".join(info))+"\n")
                logfile.write(traceback.format_exc())
    else:
        return '<span>bad</span>'
    return  '<span>ok!</span>'
```
{% endfolding %}



在非开发环境用 flask 自带的服务器就不合适了, 这里我写了一个启动脚本, 使用 Gunicorn 作为服务器

```bash
source /var/hexo_source/simpleSever/# flask 源码目录
gunicorn -w 2 -b :5000 flask_web:app # 绑定到 5000 端口. flask_web 是 py 文件名
```

运行脚本即可完成部署. 如何部署到自己的云主机什么的网上说的很详细, 不再赘述.

在 https://postwoman.com.cn/ 可以快速地进行测试:

![image](https://unpkg.zhimg.com/rikka-os@1.0.3/img/175859218616ca729eee8d82d46dd594.png)


### 更改 twikoo.all.js

在格式化后的 twikoo.all.js 5783 行处插入下面的代码:

```js
$.ajax({
    // 这个域名指向 5000 端口, 换成自己的
    url:'https://update-friend.bilibilianime.com/',
    type:'POST',
    dataType:'json',
    contentType:'application/json;charset=UTF-8',
    data:JSON.stringify(e.data),
    success:function(data, status){
        console.log(data);
    }
});
```

如图所示:
![image](https://unpkg.zhimg.com/rikka-os@1.0.3/img/491e5e1a170b16a5327352522fa2bc1e.png?123)

将主题 _config.yml 内 twikoo 的 CDN 修改为更改后的. 所有的工作就完成了

我没有对友链进行审核, 因为本来评论的人也不多, 现在就先不管了.
