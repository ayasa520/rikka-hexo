---

title: 闲话板砖
date: 2021-05-27 18:24:04

---
<!-- 
<div class="post">
  <div class="post-content">
    <div id="bber"></div>
    <div id= "exec-script"></div>
  </div>
</div>


<style>
.timeline ul {margin:0;list-style:none;padding-inline-start: 0px!important;}
.timeline ul li:hover{
    box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
    transform: translateY(-3px);
}
  .timeline ul .list>li {background:none;list-style-type:none;position: inherit;
    margin: 0.8rem 0!important;
    padding: 1.5rem!important;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
    transition: all 0.25s ease 0.2s, transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s, -webkit-transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1) 0.2s;
    user-select: none;
}
}
  /*.timeline ul li::after {transform: rotate(45deg);content:'';background-color: #3b3d42;display: block;position: absolute;top: 10px;left: -5px;width: 0.8em;height: 0.8em;outline: 15px solid #fff;}*/
  .timeline ul li div {position:relative;top:-13px;left:3em;width:670px;padding:12px 16px}
  .timeline ul li p.datatime{color: #fafafa;font-size: 0.75em;font-style: italic;background-color: var(--btn-bg);display: inline-block;padding:0.25em 1em 0.2em 1em;}
  .timeline ul li p.datacont{margin:0.65em 0 0.3em;}
  .timeline ul li p.datacont img{display:block;width:100%;}
  .timeline ul li p.datacont img[src*="emotion"]{display:inline-block;width:auto;}
  .timeline ul li p.datafrom{color: #aaa;font-size: 0.75em !important;font-style: italic;}
  .timeline ul li p{margin:0;font-size:16px;letter-spacing:1px;color: var(--font-color);}
  button{border-radius:0;}
  .dark-theme .timeline ul li div p{color:#fafafa;}
  .dark-theme .timeline ul li div p svg{fill:#fafafa;}
  .dark-theme .timeline ul li p.datafrom{color: #aaa;}
  .dark-theme .timeline ul li{background:#3b3d42;}
  .dark-theme .timeline ul li::after{outline: 15px solid #292a2d;}
  @media (max-width:860px) {
    .timeline ul li{margin-left:0;}
    .timeline ul li>div{width:calc(100vw - 75px);left:30px;}
  }
</style>


<script data-pjax src="https://cdn.jsdelivr.net/gh/ayasa520/daodao@0.2.0/daodao.js"></script>


  -->


  <!-- 引用 HexoPlusPlus_Talk组件 -->


<!-- <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@1.2.0/talk_user.js"></script> -->
<!-- 创建HexoPlusPlus_Talk容器 -->
<div id="hpp_talk"></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@1.2.0/talk.css" /> 


{% raw %}
<div class="js-pjax">
<script >
window.onload=function(){new hpp_talk({
id:"hpp_talk",//容器id
domain: "admin.jyaoushingan.workers.dev",//您的HexoPlusPlus域名，如admin.cyfan.top
limit: 10,//单次获取的最多条数
start: 0,//从第几条开始
themecss: "https://www.bilibilianime.com/css/talk.css" //自定义说说主题，可选【仅1.1.0版本及以上使用】
});}
</script>
</div>
{% endraw %}


