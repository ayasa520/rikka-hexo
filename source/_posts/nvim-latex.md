---
title: 使用 Neovim 和 VimTeX 撰写 LaTeX (Lua 配置)
date: 2021-11-19 18:16:01
description: 使用 Vim 或者 Neovim 来作为攥写 $\LaTeX$ 工具的教程屡见不鲜, 但是大都是基于 VimScript, 很少见到有使用 Lua 配置的
tag: ['Linux','LaTeX','VimTex','折腾','TeXLive']
categories: "教程"
---

本篇主要就是"折腾", 就是玩儿,{% blur 很有可能配置好后觉得还没有 Overleaf 好用.%}如果只是想尝试一下, 可以直接使用我的配置 [我的 Nvim 配置](https://github.com/ayasa520/nvimdots), fork 自 [ayamir 的 Nvim 配置](https://github.com/ayamir/nvimdots)

相关应用和插件的 **详细信息** 就不在这儿介绍了, 网上多得很, 文档也写得详细.

因为我不常用 Windows, 所以只有 Linux 下的配置.

## 需要的东西
默认使用 [wbthomason/packer.nvim](https://github.com/wbthomason/packer.nvim)来进行 Neovim 的插件管理, 本篇关注于在此基础上的 $\LaTeX$ 配置, 而非如何搭建一个好用的 Neovim, 所以其他基础的东西不会列出. 

| 名字   | 说明|
|--------------- | --------------- |
|[lervag/vimtex](https://github.com/lervag/vimtex)|用于 Vim 和 Neovim 的 $\LaTeX$ 文件类型插件|
| [mhinz/neovim-remote](https://github.com/mhinz/neovim-remote)   | 用于编辑器和 PDF 交互|
| [TeXLive](https://tug.org/texlive/acquire-netinstall.html)|TeX Live 提供 $\LaTeX$ 环境|
| [KDE/okular](https://github.com/KDE/okular)|PDF 查看器 (当然选择其他支持VimTeX 反向检索的都可以)|

## 安装并配置 VimTex

配置因人而异, 可根据具体情况修改. 

如果使用自己的配置, 在配置插件的 Lua 文件中加入下面的代码:

```Lua
use { 
    'lervag/vimtex',
    opt = true,
    config = function ()
        vim.g.vimtex_view_general_viewer = 'okular'
        vim.g.vimtex_compiler_latexmk_engines = {
            _ = '-xelatex'
        }
        vim.g.tex_comment_nospell = 1
        vim.g.vimtex_compiler_progname = 'nvr'
        vim.g.vimtex_view_general_options = [[--unique file:@pdf\#src:@line@tex]]
        vim.g.vimtex_view_general_options_latexmk = '--unique'
    end,
    ft = 'tex'
}
```

如果使用了 ayamir 的配置, 那么应该修改两个文件. 在 `lua/modules/editor/plugins/lua` 中新增下面的代码:

```lua
editor['lervag/vimtex'] = {
    opt = true,
    config = conf.vimtex,
    ft = 'tex'
}
```
在 `lua/modules/editor/plugins/config.lua` 中新增下面的代码:

```lua
function config.vimtex()
    vim.g.vimtex_view_general_viewer = 'okular'
    -- vim.g.vimtex_view_method = 'zathura'
    vim.g.vimtex_compiler_latexmk_engines = {
        _ = '-xelatex'
    }
    vim.g.tex_comment_nospell = 1
    vim.g.vimtex_compiler_progname = 'nvr'
    vim.g.vimtex_view_general_options = [[--unique file:@pdf\#src:@line@tex]]
    vim.g.vimtex_view_general_options_latexmk = '--unique'
end
```

然后进入 Neovim, 执行命令 `PackerInstall` 安装 `VimTeX`.

上面的配置指定了用于预览的 PDF 软件是 `okular`, 那么在 Neovim 中执行 `VimtexView` 即可自动打开对应的 PDF 文件并定位到当前位置, 执行 `VimtexCompile` 会进入实时编译状态并打开对应 PDF. 

## 配置反向检索

安装 `neovim-remote` 

```bash
pip3 install neovim-remote
```

上一步仅仅实现了正向检索, 即从 tex 文件定位到 PDF 文件. 要实现反向检索, 需要在 `Okular 设置->配置 Okular->编辑器` 中设置自定义编辑器, 填入 `nvr --remote-silent +%l %f`.

![](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.5/img/2021-11-19_19-36.png)

这样, 在 PDF 预览界面 {% kbd Shift %} + LeftClick 即可定位到 tex 文件的对应行. 注意 Okular 必须是在 **预览模式** 才有效, 即鼠标指针为手的形状. 而在其他的 PDF 预览软件 (如 zathura )是 {% kbd Ctrl %} + LeftClick


![反向检索演示](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.5/img/h1k1e-i5388.gif)

## 常用的命令

| 命令   |  作用   |
|--------------- | --------------- |
| `VimtexCompile`        | 持续编译模式(实时监听文件变化并编译)   |
|`VimtexClean`| 清除编译时生成的中间文件 |
|`VimtexStop`|停止监听|
|`VimtexView`|预览 PDF|


中文网络上现存 VimTex 命令的说明大都很奇怪, 说 `\ll` 是编译预览, `\lk` 是停止监听, `\lv` 是预览等等. 

第一: 不是所有人都将 `<leader>` 设为 '\\'

第二: 如果更改过按键映射, 这几个按键将对 VimTeX 毫无作用

正常的做法不应该是告诉别人快捷键而应该是命令才对吧?


当然, 所有的命令均可以通过 `:help vimtex` 在 `vimtex-commands` 块下找到, 可以根据需要设置快捷键

![](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.5/img/ahdnuihg)

## [可选] 使用 snippet 和 lsp 补全

1. 通过[williamboman/nvim-lsp-installer](https://github.com/williamboman/nvim-lsp-installer) 插件 安装 `texlab`, 直接在 Neovim 内执行 `:LspInstall texlab` 即可. 效果如下(这张图应该是在 vscode 里演示的):
![](https://cdn.jsdelivr.net/gh/latex-lsp/texlab/docs/demo.gif)


2. 通过 `packer.nvim` 安装
   [L3MON4D3/LuaSnip](https://github.com/L3MON4D3/LuaSnip). 需要搭配 [hrsh7th/nvim-cmp](https://github.com/hrsh7th/nvim-cmp) 使用
    
    LuaSnip 可以像下面这样填写配置:

    ```Lua
    function config.luasnip()
        require("luasnip").config.set_config {
            history = true,
            updateevents = "TextChanged,TextChangedI"
        }
        require("luasnip/loaders/from_vscode").load({paths={"./my_snippets"}})
    end
    ```
    
    `load()` 可以装载自定义的 snippet, 注意相对路径是以 `init.lua` 为基准的. my_snippets 文件夹中除了 snippet 的 json 文件, 还需要一个 `package.json` 来指明每个 json 文件对应的语言是什么.

    举例的 tex.lua 如下:

    ```json
    {
        "Simple Snippet Example": {
            "prefix": "text",
            "body": "this is inserted as text",
            "description": "descriptive description"
        }
    } 
    ```
    
    package.json 如下:

    ```json
    {
    "name": "snippets",
    "engines": {
        "vscode": "^1.11.0"
    },
    "contributes": {
        "snippets": [
        {
            "language": "tex",
            "path": "./tex.json"
        }
        ]
    }
    }

    ```
    整体的结构:

    ![结构](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.5/img/结构.png "结构")

    在 tex 文件中试一下:

    ![](https://cdn.jsdelivr.net/npm/rikka-os2@1.0.5/img/yihr4-c9ea6.gif) 

    更方便的做法是使用[rafamadriz/friendly-snippets](https://github.com/rafamadriz/friendly-snippets) 这类现成的插件.

    更更方便的做法是使用现成的配置 (开头提到的)

    最方便的是不折腾这些, 使用在线的 Overleaf 或者不在线的 TexStudio.
