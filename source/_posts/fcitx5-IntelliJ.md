---
title: 解决 Linux 下 IntelliJ 系列软件的 IDE 中输入框位置不正确
date: 2021-11-14
description: Wiki 上让参考"此指导", 然而并不需要看那么多
tag: ['Linux','fcitx5','输入法']
categories: "教程"
---

问题如这个 issue 所示 https://github.com/fcitx/fcitx5/issues/79 , 解决方法很简单, 替换默认的 IDE runtime 就行 [^1].

1. 前往  https://github.com/RikudouPatrickstar/JetBrainsRuntime-for-Linux-x64/releases 下载 jbr 并解压到任意目录. (我解压在了 `/usr/lib/jvm/`)

2. 打开 IntelliJ 系列的 IDE, 按 {% kbd Ctrl%} + {% kbd Shift%} + {% kbd A%}, 输入 `Choose Boot Java Runtime for the IDE...`, 并进入

3. 选择刚才解压好的 JBR 就好了

    ![](https://npm.elemecdn.com/rikka-os2@1.0.4/img/setjbr.png)


效果

![](https://npm.elemecdn.com/rikka-os2@1.0.4/img/haole.png)

----------------
[^1]: https://wiki.archlinux.org/title/Fcitx5_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#IntelliJ_%E7%B3%BB%E5%88%97%E8%BD%AF%E4%BB%B6%E7%9A%84_IDE_%E4%B8%AD%E8%BE%93%E5%85%A5%E6%A1%86%E4%BD%8D%E7%BD%AE%E4%B8%8D%E6%AD%A3%E7%A1%AE