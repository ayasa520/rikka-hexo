---
title: 自动添加 twikoo 评论中的友链
description: 基于 twikoo 实现友链自动添加, 不再需要手动更新 link.yml. 后端使用最简化的 flask
tags: ["友链","自动化","flask"]
categories: "教程"
date: 2021-07-06 02:38:38
---

{% tip warning %}
在本文中您将会看到:
- 低技术力
- 低效率
- 几乎没有的可移植性与可拓展性
{% endtip %}

唯一的优点: 对于新手 (我自己) 来说不需要掌握很多技术就能实现

## 需求

hexo 的友链页面和文章一样, 要想更新就得重新生成并部署. 使用 webhook, Github Action 或者 vercel 等实现自动化部署后, 更新网站内容变得更加方便: 本地改好后直接推送到仓库, 剩下的交给服务器去做. 但是增加友链每次都要从评论区复制粘贴到 link.yml 然后 push, 还是比较麻烦. 目前有通过 issue 添加友链的方法, 但是对于我这种懒人来讲, 能在评论区做就不想再开个网页, 所以我想要做出一点更改, 能自动获取评论中的友链信息并直接添加(这建立在自动部署的前提上). 关于审核什么的, 我就不关心了, 现在评论一共都没多少


## 思路

我的博客中评论用的是 twikoo, 云函数的代码我看不到(当然也肯定看不懂), 于是就只剩下 JS 了, 简单 F12 看一下, 发现点击`发送`按钮后, twikoo.all.js 会给 twikoo 云函数发 post 请求, 请求负载的 `request_data` 字段包含了评论内容, 评论链接等.

只需要在 twikoo.all.js 向 twikoo 云函数发送 post 请求的同时给我自己的服务器也发一个评论内容的 post 请求, 后端解析得到的 json 格式字符串, 就能提取到新增友链需要的昵称, 头像, 邮箱, 网址信息

## 具体步骤

### 配置 flask 服务器

```python

```


```js
t.prototype.post = function(e) {
    return this._request(i(i({}, e), {
        method: "post"
    }), this._restrictedMethods.includes("post"))
}
```



