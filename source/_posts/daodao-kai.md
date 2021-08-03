---
title: 基于 Vercel 和 MongoDB 的叨叨·改
description: 不再依赖于 Github issue, 增加了可用的前端页面来发送内容
tags: ["vercel","叨叨","flask"]
categories: "教程"
date: 2021-07-18 21:16:30
---
## 简介

>Q: 什么是叨叨·改?
>A: 叨叨·改是用 Flask 重写了原叨叨 ([Rock-Candy-Tea/daodao (github.com)](https://github.com/Rock-Candy-Tea/daodao))的后端, 并增添了前端的一个初步可用的应用, 前端说说展示页面直接搬运自[小冰博客 - 做个有梦想的人！ (zfe.space)](https://zfe.space/) , 其余前端来源于网络. 后端 api 可见 README
>
>A: 叨叨·改已经插件化, 项目地址: [ayasa520/hexo-daodao-plus: 适用于 hexo 的"叨叨·改"插件 (github.com)](https://github.com/ayasa520/hexo-daodao-plus). 后端项目地址: [ayasa520/daodao-kai: 叨叨改，用 flask 重写叨叨的后端 (github.com)](https://github.com/ayasa520/daodao-kai)

## 使用

- 登录

点击下方"登录"按钮, 在表单中输入用户名和密码

![](https://onedrive.bilibilianime.com/e55T/image/Snipaste_2021-08-03_21-15-27.png)

![](https://onedrive.bilibilianime.com/e55T/image/Snipaste_2021-08-03_21-16-38.png)

- 删除

登录后直接点击右侧的 x

![](https://onedrive.bilibilianime.com/e55T/image/Snipaste_2021-08-03_21-09-31.png)

- 发送

登录后点击下方"新建"按钮, 在文本框中输入内容. 支持 Markdown.

![](https://onedrive.bilibilianime.com/e55T/image/Snipaste_2021-08-03_21-12-27.png)

![](https://onedrive.bilibilianime.com/e55T/image/Snipaste_2021-08-03_21-12-39.png)

## 后端部署

### Vercel 部署

#### 配置 MongoDB (若使用自己的 MongoDB 数据库可跳过)

1. 在 [MongoDB Atlas | MongoDB](https://www.mongodb.com/cloud/atlas/register) 申请 MongoDB 帐号

   选免费的, 其他全默认选项![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/7f02ecd79beb8edbf548f18e1c1b0896.png)

1. 点击 connect![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/bfbc7980d4f8f6f80fd15f8a51d65100.png)

1. 选择 `Allow Access From Anywhere ` 并确认

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/ed561893c173a331c2e2b43fec082179.png)

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/57ab88e29758199532e92a1a2e666d51.png)

1. 输入数据库的用户名和密码, 不要带有特殊字符, 因为我的后端没有做转义

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/ab4e876949ec84be0dac7474991bb782.png) 

1. 选择 `Connect your application`![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/a87a877734d4a5d99b9c34cff06ed9c6.png)

6. 复制数据库的连接字符串, **注意手动将 `<password>` 换成刚刚输入的密码**![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/6389c289443f4af0fdc00ab64fb2e4d9.png)

#### 配置 Vercel

1. 点击下面的按钮创建 Vercel 项目

   {% btns circle grid5 %}
   {% cell 点击部署, https://vercel.com/import/project?template=https://github.com/ayasa520/daodao-kai,/image/image.svg %}
   {% endbtns %}

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/079a98929983abc78d1f3089e0dfd47a.png)

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/c1d708feeacb44a67069694dd8ea022e.png)

1. 部署好后, 添加三个环境变量 `MONGODB` : 刚才复制的数据库连接字符串; `USERNAME`: 自定义叨叨·改登录名; `PASSWORD`: 自定义叨叨·改登陆密码. 由于刚才部署的时候还没有配置环境变量, 此时配置好后需要 **重新部署**

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/cd0db9b6fda534a1e2c351098271b46a.png)

## 前端部署

### 不使用插件 (不适用于当前最新版本)

以这种方式添加没有首页的滚动组件


在 _posts 下新建一个 md 文件, 内容如下, 注意把 `https://daodao-omega.vercel.app/api/query/20` 换成自己的. **不要忘记写后面的 `api/query/20`** 

{% folding green, 代码%}
```html
---
title: 闲话板砖
date: 2021-05-27 18:24:04
---

  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/ayasa520/daodao-kai@main/static/css/index.css" />

   <div id="bber">
        <section class="timeline page-1">
                <div class="list" id="bbitems">
                </div>
        </section>
    </div>
    
{% raw %}
    <script src="https://unpkg.com/art-template@4.13.2/lib/template-web.js"></script>
    <script id="template" type="text/html">
        {{each list item index}}
        <div class="item" id={{item["_id"]}}>
            <p class="datatime">{{item["date"]}}</p>
            <p class="datacont">
                {{@item["content"]}}
            </p>
            <p class="datafrom">
                <small><i class="fas fa-tools"></i>{{item["from"]}}</small>
            </p>
        </div>
        {{/each}}
    </script>
{% endraw %}

  <script>
    var xmlHttp = new XMLHttpRequest();
    // 注意下面的链接换成自己的
    xmlHttp.open("get","https://daodao-kai.vercel.app/api/query/20");
    xmlHttp.send(null);
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200)
        {
            console.log(xmlHttp.responseText);
            var result = JSON.parse(xmlHttp.responseText);
            var html = template('template', { list: result })
            document.getElementById("bbitems").innerHTML = html;
        }
    }</script>
```
{% endfolding %}

然后就能看到了:

![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/f3d51a5a94b4e167afb84e1c63c43f5d.png)

### npm 插件 (推荐)

#### 安装

在 hexo 博客根目录运行 npm 命令

```bash
npm install hexo-daodao-plus --save
```

#### 配置

在主题文件夹下 (或者根目录) 的 `_config.yml` 中添加下面的配置项

```yml
daodao_plus:
  enable: 
    page: true
    card: true
  priority: 0
  filter: 
  url: https://daodao-kai.vercel.app/
  path: daodaoplus 
  front_matter: 
    title: 闲话板砖
    comments: true
  CDN: 
    js: https://cdn.jsdelivr.net/npm/hexo-daodao-plus@2.1.2/dist/js/main.js
    css: https://cdn.jsdelivr.net/npm/hexo-daodao-plus@2.1.2/dist/css/main.css
```

配置项说明

| 配置项       | 默认                      | 说明                                            |
| ------------ | ------------------------- | ----------------------------------------------- |
| enable.page  | **必填**                  | 单独叨叨页面的开关                              |
| enable.card  | **必填**                  | 首页叨叨 swiper 的开关                          |
| url          | **必填**                  | 叨叨后端的 api                                  |
| CDN          | **必填**                  | 引入的 CSS 和 JavaScript 文件的链接             |
| priority     | 0                         | 过滤器优先级, priority 值越低, 过滤器会越早执行 |
| filter       | ['iframe','img','script'] | 设置叨叨不在首页显示的标签类型                  |
| path         | daodaoplus                | 路径名称, 生成的页面为 [path]/index.html        |
| front_matter | 非必填                    | 页面自定义 front_matter                         |

#### 截图

![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/0469b9627d2384e678b0a72872f0e0f0.png)

![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/3c049c61ec20f85ec6b29ba9275b5161.png)