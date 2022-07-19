---
title: Linux 版本 WPS 缩放问题导致字体模糊的解决方法
date: 2021-09-10 12:24:13
description: 终于有原生 WPS 了, 打开一看却发现字体糊成一团,就好像没有抗锯齿
tag: ['Linux','WPS','缩放','fcitx5','输入法']
categories: "教程"
---

如果设置了全局缩放, 在 WPS 中可能会出现 UI 中文字清晰, 而正文的文字模糊的情况, 如下图: 

![2021-09-10_13-20](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.0/2021-09-10_13-20.png)

放大查看: 

![image-20210910132548843](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.0/image-20210910132548843.png)



**解决方法**: 

在所有的执行 `/usr/bin/wps`, `/usr/bin/et` `/usr/bin/wpp` 等命令的前面添加 `env QT_SCREEN_SCALE_FACTORS=1`, 无论是 desktop 文件中还是文件默认打开方式执行的命令.

比如修改 desktop 文件如下:

![2021-09-08_11-38](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.1/2021-09-08_11-38.png)

修改后的效果:

![2021-09-10_13-19](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.0/2021-09-10_13-19.png)

放大查看:

![image-20210910133309962](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.0/image-20210910133309962.png)
