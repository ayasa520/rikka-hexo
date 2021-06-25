---
title: 将 mp4 视频切片成 ts 后使用 jsDelivr 加速制作 "视频床"
description: 薅资本主义的羊毛
tags: ["薅羊毛","m3u8","dplayer","jsDelivr"]
categories: "教程"
---

<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.min.js"></script>


将 mp4 转为 ts 后, 使用 ffmpeg 将 ts 文件切片, 然后上传到 Github 的仓库里

此处使用的播放器为 DPlayer:{% link DPlayer 官方文档, http://dplayer.js.org/zh/, https://i.loli.net/2019/06/06/5cf8c5d94521136430.png %}

使用之前要必须先引入 hls.js

```js
<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.min.js"></script>
```

也可以用 `hexo-tag-dplayer` 通过外挂标签的形式使用 DPlayer:

<script src="https://cdn.jsdelivr.net/gh/ayasa520/hexo/source/js/DPlayer.min.js"></script>

```
{% dplayer "url=https://cdn.jsdelivr.net/gh/ayasa520/assets/%E8%96%87%E8%96%87%20-%E8%90%A4%E7%9F%B3%E7%9C%BC%E4%B9%8B%E6%AD%8C-4/playlist.m3u8" "type: 'hls'",  "id=9E2E3368B56CDBB4" "loop=yes" "theme=#FADFA3" "autoplay=false"  %}
```


**示例**:
看不到视频请刷新
<div id="dplayer" class="dplayer-video dplayer dplayer-no-danmaku"></div>   
<script>
  $(function(){ 
    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      autoplay:!0,theme:"#FADFA3",loop:true,preload:"auto",volume:Number("20"),
      video: {
          url: 'https://cdn.jsdelivr.net/gh/ayasa520/assets/%E8%96%87%E8%96%87%20-%E8%90%A4%E7%9F%B3%E7%9C%BC%E4%B9%8B%E6%AD%8C-4/playlist.m3u8',
          type: 'hls',
},});})</script>

仓库:

{% ghcard ayasa520/assets %}