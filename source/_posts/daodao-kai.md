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
>A: 目前叨叨·改并未制作为 hexo 的相关插件, 只能手动引入 js 调用. 所以首页的公告栏也是没有的.

## 快速上手

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



3. 在 `/login` 下输入环境变量配置的用户名和密码

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/f2c1782589a35e72194ef3f625a8e45c.png)

3. 登录后, 在 `/create` 下发内容

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/8ee4167234f1311369485baaa567b35c.png)

3. 在首页可以看到刚才发的内容, 说明配置成功了

   ![image](https://cdn.jsdelivr.net/gh/ayasa520/img@main/39f898cf2ed551f5ca6f8c621a0dd738.png)

#### 在博客中引入叨叨·改

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