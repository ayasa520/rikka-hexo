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
    xmlHttp.open("get","https://daodao-omega.vercel.app/api/query/20");
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

