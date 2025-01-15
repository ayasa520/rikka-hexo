---
title: 为 butterfly 主题的 twikoo 添加图片点击放大功能 
description: butterfly 把各种插件都集成好了, 真方便啊
tags: ["图片放大","zoom","twikoo"]
categories: "教程"
date: 2021-07-16 01:09:38
---

只需将 twikoo.pug 中对应的代码修改如下 (直接抄自 main.js)

```js
      twikoo.init(Object.assign({
        el: '#twikoo-wrap',
        envId: '!{theme.twikoo.envId}',
        region: '!{theme.twikoo.region}',
        onCommentLoaded: function () {
          if(typeof window.mediumZoom!='undefined'){
            const zoomComment = mediumZoom(document.querySelectorAll('.tk-content :not(a)>img'))
            zoomComment.on('open', e => {
              const photoBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#121212' : '#fff'
              zoomComment.update({
                background: photoBg
              })
            })
          }
          if(GLOBAL_CONFIG.lightbox === 'fancybox'){
              const addFancybox = function (ele) {
                const runFancybox = (ele) => {
                  ele.each(function (i, o) {
                    const $this = $(o)
                    const lazyloadSrc = $this.attr('data-lazy-src') || $this.attr('src')
                    const dataCaption = $this.attr('alt') || ''
                    $this.wrap(`<a href="${lazyloadSrc}" data-fancybox="group" data-caption="${dataCaption}" class="fancybox"></a>`)
                  })

                  $().fancybox({
                    selector: '[data-fancybox]',
                    loop: true,
                    transitionEffect: 'slide',
                    protect: true,
                    buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
                    hash: false
                  })
                }

                if (typeof $.fancybox === 'undefined') {
                  $('head').append(`<link rel="stylesheet" type="text/css" href="${GLOBAL_CONFIG.source.fancybox.css}">`)
                  $.getScript(`${GLOBAL_CONFIG.source.fancybox.js}`, function () {
                    runFancybox($(ele))
                  })
                } else {
                  runFancybox($(ele))
                }
              }
            addFancybox(document.querySelectorAll('.tk-content :not(a)>img'))
          }
        }
      }, !{JSON.stringify(theme.twikoo.option)}))
```
