var getFileContent = function(e, t) {
    if (e.files && e.files.length > 0 && e.files[0].size > 0) {
        var n = e.files[0];
        if (window.FileReader) {
            var i = new FileReader;
            i.onloadend = function(e) {
                e.target.readyState == FileReader.DONE && t(e.target.result)
            }
            ,
            i.readAsText(n, "UTF-8")
        }
    }
};
function hpp_md_editor({ele: e, data_name: t, owo: n, backuptime: i}) {
    new Notyf;
    null == e && (console.log("ERROR:No ID"),
    e = "edit"),
    null == t && (console.log("ERROR:No data_name"),
    t = "hpp_editor"),
    null == n && (console.log("ERROR:No owo"),
    n = "https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/assets/list.json"),
    document.getElementById(e).innerHTML = `\n<div class="black2">\n\t<button onclick="hpp_start_or_stop_backup()" class="btn btn-primary"><i class="fa fa-clock-o fa-2x"></i></button> \n    <button onclick="$('#input').click();" class="btn btn-primary"><i class="fa fa-photo fa-2x"></i></button>\n    <button onclick="$('#upload_md').click();" class="btn btn-primary"><i class="fa fa-file fa-2x"></i></button>\n    <button onclick="hpp_preview('${e}','${t}')" id="hpp_eye_${e}" class="btn btn-primary"><i class="fa fa-eye fa-2x"></i></button>\n\t\n</div>   \n<textarea style="border:0;border-radius:5px;background-color:#90939920;width: 100%;min-height: 400px;padding: 10px;resize: none;display:block" id="text_${e}"></textarea><div style="border:0;border-radius:5px;background-color:#90939920;max-width: 100%;min-height: 70%;padding: 10px;resize: none;display: none;" id="div_${e}" class="hpp_pre_div"></div><div class="OwO"></div>`,
    document.getElementById(`text_${e}`).value = localStorage.getItem(`hpp_${t}_backup`),
    setInterval(`hpp_backup('${t}','${e}')`, i);
    new OwO({
        container: document.getElementsByClassName("OwO")[0],
        api: hpp_OwO,
        position: "down",
        maxHeight: "250px"
    })
}
function hpp_add_mark(e) {
    document.getElementById("text_hpp_talk_editor").value += e
}
function hpp_replace_mark(e) {
    document.getElementById("text_hpp_talk_editor").value = e
}
function hpp_backup(e, t) {
    if ("1" == localStorage.getItem("hpp_editor_autobackup")) {
        var n = new Notyf;
        localStorage.setItem(`hpp_${e}_backup`, document.getElementById(`text_${t}`).value),
        n.success("自动备份成功！")
    } else
        "2" == localStorage.getItem("hpp_editor_autobackup") ? localStorage.setItem(`hpp_${e}_backup`, document.getElementById(`text_${t}`).value) : console.log("自动备份功能没开！")
}
function hpp_start_or_stop_backup() {
    var e = new Notyf;
    "2" == localStorage.getItem("hpp_editor_autobackup") ? (localStorage.setItem("hpp_editor_autobackup", "0"),
    e.error("嘿！你关闭了自动备份！注意数据安全！")) : "0" == localStorage.getItem("hpp_editor_autobackup") ? (localStorage.setItem("hpp_editor_autobackup", "1"),
    e.success("自动备份打开成功！自动备份提醒打开成功！")) : (localStorage.setItem("hpp_editor_autobackup", "2"),
    e.success("自动备份打开成功！自动备份提醒关闭成功！"))
}
function hpp_upload_photo() {}
function hpp_upload_file() {}
function hpp_preview(e, t) {
    "none" != document.getElementById(`text_${e}`).style.display ? (document.getElementById(`div_${e}`).style.display = "block",
    document.getElementById(`text_${e}`).style.display = "none",
    document.getElementById(`hpp_eye_${e}`).innerHTML = '<i class="fa fa-eye-slash fa-2x"></i>',
    document.getElementById(`div_${e}`).innerHTML = "正在渲染markdown文本中...",
    document.getElementById(`div_${e}`).innerHTML = marked(document.getElementById(`text_${e}`).value)) : (document.getElementById(`div_${e}`).style.display = "none",
    document.getElementById(`text_${e}`).style.display = "block",
    document.getElementById(`hpp_eye_${e}`).innerHTML = '<i class="fa fa-eye fa-2x"></i>')
}
function hpp_del(e) {
    swal({
        title: "\n删除中...",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",
        text: "\n",
        button: !1,
        closeModal: !1
    });
    var t = ajaxObject();
    t.open("post", "/hpp/admin/api/deltalk", !0),
    t.setRequestHeader("Content-Type", "text/plain"),
    t.onreadystatechange = function() {
        4 == t.readyState && 200 == t.status && (swal.close(),
        swal("已删除！", "", {
            icon: "success",
            buttons: {
                yes: "是"
            }
        }).then((e=>{
            window.location.reload()
        }
        )))
    }
    ,
    t.send(e)
}
function hpp_vi(e) {
    swal({
        title: "\n修改中...",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",
        text: "\n",
        button: !1,
        closeModal: !1
    });
    var t = ajaxObject();
    t.open("post", "/hpp/admin/api/visibletalk", !0),
    t.setRequestHeader("Content-Type", "text/plain"),
    t.onreadystatechange = function() {
        4 == t.readyState && 200 == t.status && (swal.close(),
        swal("已修改可见性！", "", {
            icon: "success",
            buttons: {
                yes: "是"
            }
        }).then((e=>{
            window.location.reload()
        }
        )))
    }
    ,
    t.send(e)
}
function hpp_loadmore(e, t, n) {
    new hpp_talk({
        id: e,
        domain: t,
        limit: n,
        start: Number(localStorage.getItem("hpp_start"))
    })
}
function hpp_talk({id: e, domain: t, limit: n, start: i}) {
    function r(e) {
        var t = 0;
        for (var n in e)
            t++;
        return t
    }
    console.log(e),
    document.getElementById(e).innerHTML = '<div class="hpp_talk_loading"><div class="hpp_talk_part"><div style="display: flex;justify-content: center;"><div class="hppt_loader"><div class="hppt_inner one"></div><div class="hppt_inner two"></div><div class="hppt_inner three"></div></div></div></div><p style="text-align:center;">加载 HexoPlusPlus_Talk_管理员模式 中</p></div>',
    back = "https://" + t + "/hpp/admin/api/gethpptalk";
    var s = ajaxObject();
    s.open("post", back, !0),
    s.setRequestHeader("Content-Type", "text/plain"),
    s.onreadystatechange = function() {
        if (4 == s.readyState)
            if (200 == s.status) {
                document.getElementById(e).innerHTML = `<div class="hppt_streamline hppt_b-l hppt_m-l-lg hppt_m-b hppt_padder-v">\n   <ol id="hpp_talk_list"></ol> \n   <a href="javascript:hpp_loadmore('${e}','${t}',${n})" class="hppt_button_nextpage">下一页</a>\n  </div>`,
                console.log("OK"),
                console.log(s.responseText);
                let a = JSON.parse(s.responseText)
                  , l = "";
                document.getElementById("hpp_talk_list").innerHTML = "";
                for (var i = 0; i < r(a); i++) {
                    if (null == a[i]) {
                        localStorage.setItem("hpp_start", 0);
                        break
                    }
                    let e = JSON.parse(a[i]);
                    l = "False" == e.visible ? '<svg t="1612656293849" class="hppt_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8311" width="20" height="20"><path d="M246.4 258.304l-83.84-83.84 46.464-46.4L309.12 228.288A543.04 543.04 0 0 1 512 190.72c211.968 0 382.592 107.136 512 321.28-58.688 98.56-126.464 174.464-203.456 227.648l109.888 109.888-46.4 46.4-121.408-121.408a517.504 517.504 0 0 1-1.088 0.576l-68.224-68.224 1.216-0.512-117.312-117.312-0.896 0.832L435.2 448.832l0.768-0.96L313.6 325.376a435.968 435.968 0 0 0-1.152 0.576L245.376 258.944l1.088-0.64z m509.248 416.448c60.8-37.76 115.456-91.712 164.48-162.432-108.736-155.136-242.88-229.76-408.128-229.76-46.08 0-89.728 5.76-131.072 17.472l112.32 112.32c6.144-1.28 12.48-1.92 19.008-1.92 54.272 0 98.368 45.696 98.368 102.016 0 5.44-0.448 10.816-1.28 16l146.304 146.304z m-566.4-379.2L253.44 359.808c-54.592 37.12-104.32 87.808-149.632 152.512 107.2 154.688 241.28 229.12 408.128 229.12 38.72 0 75.712-3.968 111.04-12.096l73.6 73.6A553.984 553.984 0 0 1 512 833.28c-213.888 0-384.512-107.136-512-321.28 55.488-91.84 118.592-163.968 189.248-216.448zM508.032 614.4L414.144 520.448c3.84 51.2 44.096 91.776 93.888 93.952z" fill="#1296db" p-id="8312"></path></svg>' : '<svg t="1612656197741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7951" width="20" height="20"><path d="M512 283.456c-165.248 0-299.392 74.304-408.128 228.864 107.2 154.112 241.28 228.224 408.128 228.224 166.848 0 300.928-74.112 408.128-228.224C811.392 357.76 677.248 283.52 512 283.52zM512 832c-213.888 0-384.512-106.688-512-320 129.408-213.312 300.032-320 512-320 211.968 0 382.592 106.688 512 320-127.488 213.312-298.112 320-512 320z m0-137.152a182.848 182.848 0 1 0 0-365.696 182.848 182.848 0 0 0 0 365.696zM512 576a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" fill="#1296db" p-id="7952"></path></svg>';
                    let t = marked(e.content);
                    document.getElementById("hpp_talk_list").innerHTML += `<div id="${e.id}" class="hppt_comment-body hppt_comment-parent hppt_comment-odd hppt_comment-by-user"> <div id="item">\n     <a class="hppt_pull-left hppt_thumb-sm hppt_avatar hppt_m-l-n-md"> <img nogallery="" src="${e.avatar}" class="hppt_img-40px hppt_photo hppt_img-square hppt_normal-shadow"> </a> \n     <div class="hppt_time-machine hppt_m-l-lg hppt_panel hppt_box-shadow-wrap-normal"> \n      <div class="hppt_panel-heading hppt_pos-rlt hppt_b-b hppt_b-light">\n       <span class="hppt_text-muted hppt_m-l-sm hppt_pull-right" datetime="${e.time}"><strong class="talk_mobile_hide">  ${e.name}·</strong>${e.time}</span> \n      </div> \n      <div class="hppt_panel-body hppt_comment-content-true"> \n       <p>${t}</p> \n      </div> \n      <div class="hppt_panel-footer"> \n       <div class="hppt_say_footer">\n<a href="javascript:hpp_del(${e.id});"><svg t="1611833138243" class="hppt_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2021" width="20" height="20"><path d="M832.192 296.96c0.768 10.112 1.28 20.288 1.28 30.656l0 506.112c0 83.264-41.664 158.208-130.432 158.208L311.552 991.936c-88.704 0-130.368-74.944-130.368-158.208L181.184 327.616c0-10.304 0.768-20.544 1.984-30.656l-67.2 0L115.968 170.432l195.648-0.128L311.616 145.92c0-56.32 53.44-102.08 119.36-102.08l152.832 0c65.92 0 119.232 45.76 119.232 102.08l0 23.552 195.712 0.832L898.752 296.96 832.192 296.96 832.192 296.96zM637.76 145.92c0-21.056-24.64-38.784-54.016-38.784L430.912 107.136c-29.312 0-54.08 17.792-54.08 38.784l0 24.32 260.928 0L637.76 145.92 637.76 145.92zM768.192 327.616c0-10.56-0.704-20.8-2.112-30.656L248.512 296.96C247.168 306.816 246.4 317.12 246.4 327.616l0 506.112c0 48.512 12.48 94.976 65.152 94.976l391.488 0c52.864 0 65.216-46.528 65.216-94.976L768.256 327.616 768.192 327.616zM311.552 865.664 311.552 359.936l65.28 0 0 505.728L311.552 865.664 311.552 865.664zM474.688 865.664 474.688 359.936l65.152 0 0 505.728L474.688 865.664 474.688 865.664zM637.76 865.664 637.76 359.936l65.28 0 0 505.728L637.76 865.664 637.76 865.664z" p-id="2022" fill="#1296db"></path></svg></a> | <a href="javascript:hpp_vi(${e.id});">${l}</a>\n\t   </div> \n      </div> \n     </div> \n    </div>`
                }
            } else
                console.log("ERROR")
    }
    ;
    let a = {
        limit: n,
        start: i
    };
    i += n,
    localStorage.setItem("hpp_start", i),
    s.send(JSON.stringify(a))
}
function base64Encode(e) {
    var t;
    return t = encodeURIComponent(e),
    t = unescape(t),
    t = window.btoa(t)
}
document.getElementById("upload_md").onchange = function() {
    var e = document.getElementById("text_hpp_doc_editor");
    getFileContent(this, (function(t) {
        e.value = t
    }
    ))
}
,
(()=>{
    class e {
        constructor(e) {
            const t = {
                logo: '<svg t="1612669041308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2519" width="32" height="32"><path d="M512 512m-511.982387 0a511.982387 511.982387 0 1 0 1023.964774 0 511.982387 511.982387 0 1 0-1023.964774 0Z" fill="#F9C228" p-id="2520"></path><path d="M917.619539 199.639491C761.536154-3.082215 483.485105-56.554248 265.951152 62.930031a531.620502 531.620502 0 0 0-166.598142 387.161472c0 294.430822 238.686756 533.099966 533.099966 533.099966a535.424837 535.424837 0 0 0 101.219951-9.598899 514.289646 514.289646 0 0 0 90.705195-55.973031C1048.393533 745.138768 1090.223598 423.672515 917.619539 199.639491z" fill="#FCDC22" p-id="2521"></path><path d="M972.042656 550.272308c-111.329618 114.904988-252.600757 198.670795-415.482628 260.033299 0 0 55.867355 156.664603 207.829377 101.53698 250.628139-90.846096 207.653251-361.570279 207.653251-361.570279z" fill="#FC9B88" p-id="2522"></path><path d="M522.690884 570.08655a80.119986 64.145304 90 1 0 128.290609 0 80.119986 64.145304 90 1 0-128.290609 0Z" fill="#282828" p-id="2523"></path><path d="M860.519298 429.449467a80.119986 54.881046 90 1 0 109.762092 0 80.119986 54.881046 90 1 0-109.762092 0Z" fill="#282828" p-id="2524"></path><path d="M953.813553 724.584795a261.319023 261.319023 0 0 0-116.014585-59.988717C754.121225 723.616099 659.699759 771.434469 556.560028 810.305607c0 0 55.867355 156.664603 207.829377 101.53698 110.959752-40.209701 164.361335-115.64472 189.424148-187.257792z" fill="#EA0F1A" p-id="2525"></path></svg>',
                container: document.getElementsByClassName("OwO")[0],
                position: "down",
                width: "100%",
                maxHeight: "250px",
                api: "https://api.anotherhome.net/OwO/OwO.json"
            };
            for (let n in t)
                t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
            this.container = e.container,
            "up" === e.position && this.container.classList.add("OwO-up");
            const n = new XMLHttpRequest;
            n.onreadystatechange = ()=>{
                4 === n.readyState && (n.status >= 200 && n.status < 300 || 304 === n.status ? (this.odata = JSON.parse(n.responseText),
                this.init(e)) : console.log("OwO data request was unsuccessful: " + n.status))
            }
            ,
            n.open("get", e.api, !0),
            n.send(null)
        }
        init(e) {
            this.packages = Object.keys(this.odata);
            let t = `\n            <div class="OwO-logo"><span>${e.logo}</span></div>\n            <div class="OwO-body" style="width: ${e.width}">`
              , n = ""
              , i = "";
            for (let r = 0; r < this.packages.length; r++) {
                t += `\n                <ul class="OwO-items OwO-items-${this.odata[this.packages[r]].type}" style="max-height: ${parseInt(e.maxHeight) - 53 + "px"};">`;
                let s = this.odata[this.packages[r]].container;
                for (let e = 0; e < s.length; e++) {
                    i = /src=[\'\"]?([^\'\"]*)[\'\"]?/.exec(s[e].icon);
                    try {
                        i = i[1],
                        n = `<img src="" data-src="${i}" class="hpp_emo_${this.packages[r]}">`
                    } catch (t) {
                        n = s[e].icon
                    }
                    t += `\n                    <li class="OwO-item" title="${s[e].text}">${n}</li>`
                }
                t += "\n                </ul>"
            }
            t += '\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">';
            for (let e = 0; e < this.packages.length; e++)
                t += `\n                        <li><span>${this.packages[e]}</span></li>`;
            t += "\n                    </ul>\n                </div>\n            </div>\n            ",
            this.container.innerHTML = t,
            this.logo = this.container.getElementsByClassName("OwO-logo")[0],
            this.logo.addEventListener("click", (()=>{
                this.toggle()
            }
            ));
            let r = "";
            this.container.getElementsByClassName("OwO-body")[0].addEventListener("click", (e=>{
                let t = null;
                if (e.target.classList.contains("OwO-item") ? t = e.target : e.target.parentNode.classList.contains("OwO-item") && (t = e.target.parentNode),
                t) {
                    r = /src=[\'\"]?([^\'\"]*)[\'\"]?/.exec(t.innerHTML);
                    try {
                        r = r[1],
                        n = `![](${r})`
                    } catch (e) {
                        n = t.innerHTML,
                        console.log(n + "ERROR")
                    }
                    hpp_add_mark(n)
                }
            }
            )),
            this.packagesEle = this.container.getElementsByClassName("OwO-packages")[0];
            for (let e = 0; e < this.packagesEle.children.length; e++)
                (t=>{
                    this.packagesEle.children[e].addEventListener("click", (()=>{
                        this.tab(t)
                    }
                    ))
                }
                )(e);
            this.tab(0)
        }
        toggle() {
            this.container.classList.contains("OwO-open") ? this.container.classList.remove("OwO-open") : this.container.classList.add("OwO-open")
        }
        tab(e) {
            const t = this.container.getElementsByClassName("OwO-items-show")[0];
            t && t.classList.remove("OwO-items-show"),
            this.container.getElementsByClassName("OwO-items")[e].classList.add("OwO-items-show");
            const n = this.container.getElementsByClassName("OwO-package-active")[0];
            $(`.hpp_emo_${this.packages[e]}`).Lazy(),
            n && n.classList.remove("OwO-package-active"),
            this.packagesEle.getElementsByTagName("li")[e].classList.add("OwO-package-active")
        }
    }
    "undefined" != typeof module && void 0 !== module.exports ? module.exports = e : window.OwO = e
}
)(),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).marked = t()
}(this, (function() {
    "use strict";
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
    }
    function t(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++)
            i[n] = e[n];
        return i
    }
    function n(e, n) {
        var i;
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator])
            return (i = e[Symbol.iterator]()).next.bind(i);
        if (Array.isArray(e) || (i = function(e, n) {
            if (e) {
                if ("string" == typeof e)
                    return t(e, n);
                var i = Object.prototype.toString.call(e).slice(8, -1);
                return "Map" === (i = "Object" === i && e.constructor ? e.constructor.name : i) || "Set" === i ? Array.from(e) : "Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i) ? t(e, n) : void 0
            }
        }(e)) || n && e && "number" == typeof e.length) {
            i && (e = i);
            var r = 0;
            return function() {
                return r >= e.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: e[r++]
                }
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    function i(e) {
        return p[e]
    }
    var r, s = (function(e) {
        function t() {
            return {
                baseUrl: null,
                breaks: !1,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: null,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartLists: !1,
                smartypants: !1,
                tokenizer: null,
                walkTokens: null,
                xhtml: !1
            }
        }
        e.exports = {
            defaults: {
                baseUrl: null,
                breaks: !1,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: null,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartLists: !1,
                smartypants: !1,
                tokenizer: null,
                walkTokens: null,
                xhtml: !1
            },
            getDefaults: t,
            changeDefaults: function(t) {
                e.exports.defaults = t
            }
        }
    }(r = {
        exports: {}
    }),
    r.exports), a = /[&<>"']/, l = /[&<>"']/g, o = /[<>"']|&(?!#?\w+;)/, c = /[<>"']|&(?!#?\w+;)/g, p = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, h = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
    function u(e) {
        return e.replace(h, (function(e, t) {
            return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
        }
        ))
    }
    var d = /(^|[^\[])\^/g
      , g = /[^\w:]/g
      , f = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
      , m = {}
      , k = /^[^:]+:\/*[^/]*$/
      , b = /^([^:]+:)[\s\S]*$/
      , x = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    function _(e, t, n) {
        var i = e.length;
        if (0 === i)
            return "";
        for (var r = 0; r < i; ) {
            var s = e.charAt(i - r - 1);
            if (s !== t || n) {
                if (s === t || !n)
                    break;
                r++
            } else
                r++
        }
        return e.substr(0, i - r)
    }
    var w = function(e, t) {
        if (t) {
            if (a.test(e))
                return e.replace(l, i)
        } else if (o.test(e))
            return e.replace(c, i);
        return e
    }
      , v = u
      , y = function(e, t) {
        e = e.source || e,
        t = t || "";
        var n = {
            replace: function(t, i) {
                return i = (i = i.source || i).replace(d, "$1"),
                e = e.replace(t, i),
                n
            },
            getRegex: function() {
                return new RegExp(e,t)
            }
        };
        return n
    }
      , $ = {
        exec: function() {}
    }
      , z = function(e) {
        for (var t, n, i = 1; i < arguments.length; i++)
            for (n in t = arguments[i])
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
    }
      , S = function(e, t) {
        var n = e.replace(/\|/g, (function(e, t, n) {
            for (var i = !1, r = t; 0 <= --r && "\\" === n[r]; )
                i = !i;
            return i ? "|" : " |"
        }
        )).split(/ \|/)
          , i = 0;
        if (n.length > t)
            n.splice(t);
        else
            for (; n.length < t; )
                n.push("");
        for (; i < n.length; i++)
            n[i] = n[i].trim().replace(/\\\|/g, "|");
        return n
    }
      , O = function(e, t) {
        if (-1 === e.indexOf(t[1]))
            return -1;
        for (var n = e.length, i = 0, r = 0; r < n; r++)
            if ("\\" === e[r])
                r++;
            else if (e[r] === t[0])
                i++;
            else if (e[r] === t[1] && --i < 0)
                return r;
        return -1
    }
      , I = s.defaults
      , R = _
      , A = S
      , T = w
      , E = O;
    function L(e, t, n) {
        var i = t.href
          , r = t.title ? T(t.title) : null;
        t = e[1].replace(/\\([\[\]])/g, "$1");
        return "!" !== e[0].charAt(0) ? {
            type: "link",
            raw: n,
            href: i,
            title: r,
            text: t
        } : {
            type: "image",
            raw: n,
            href: i,
            title: r,
            text: T(t)
        }
    }
    var C = function() {
        function e(e) {
            this.options = e || I
        }
        var t = e.prototype;
        return t.space = function(e) {
            if (e = this.rules.block.newline.exec(e))
                return 1 < e[0].length ? {
                    type: "space",
                    raw: e[0]
                } : {
                    raw: "\n"
                }
        }
        ,
        t.code = function(e, t) {
            if (e = this.rules.block.code.exec(e))
                return (t = t[t.length - 1]) && "paragraph" === t.type ? {
                    raw: e[0],
                    text: e[0].trimRight()
                } : (t = e[0].replace(/^ {1,4}/gm, ""),
                {
                    type: "code",
                    raw: e[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? t : R(t, "\n")
                })
        }
        ,
        t.fences = function(e) {
            var t = this.rules.block.fences.exec(e);
            if (t) {
                var n = t[0];
                e = function(e, t) {
                    if (null === (e = e.match(/^(\s+)(?:```)/)))
                        return t;
                    var n = e[1];
                    return t.split("\n").map((function(e) {
                        var t = e.match(/^\s+/);
                        return null !== t && t[0].length >= n.length ? e.slice(n.length) : e
                    }
                    )).join("\n")
                }(n, t[3] || "");
                return {
                    type: "code",
                    raw: n,
                    lang: t[2] && t[2].trim(),
                    text: e
                }
            }
        }
        ,
        t.heading = function(e) {
            var t = this.rules.block.heading.exec(e);
            if (t) {
                var n = t[2].trim();
                return /#$/.test(n) && (e = R(n, "#"),
                !this.options.pedantic && e && !/ $/.test(e) || (n = e.trim())),
                {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: n
                }
            }
        }
        ,
        t.nptable = function(e) {
            if (e = this.rules.block.nptable.exec(e)) {
                var t = {
                    type: "table",
                    header: A(e[1].replace(/^ *| *\| *$/g, "")),
                    align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : [],
                    raw: e[0]
                };
                if (t.header.length === t.align.length) {
                    for (var n = t.align.length, i = 0; i < n; i++)
                        /^ *-+: *$/.test(t.align[i]) ? t.align[i] = "right" : /^ *:-+: *$/.test(t.align[i]) ? t.align[i] = "center" : /^ *:-+ *$/.test(t.align[i]) ? t.align[i] = "left" : t.align[i] = null;
                    for (n = t.cells.length,
                    i = 0; i < n; i++)
                        t.cells[i] = A(t.cells[i], t.header.length);
                    return t
                }
            }
        }
        ,
        t.hr = function(e) {
            if (e = this.rules.block.hr.exec(e))
                return {
                    type: "hr",
                    raw: e[0]
                }
        }
        ,
        t.blockquote = function(e) {
            var t = this.rules.block.blockquote.exec(e);
            if (t)
                return e = t[0].replace(/^ *> ?/gm, ""),
                {
                    type: "blockquote",
                    raw: t[0],
                    text: e
                }
        }
        ,
        t.list = function(e) {
            if (e = this.rules.block.list.exec(e)) {
                for (var t, n, i, r, s, a = e[0], l = e[2], o = 1 < l.length, c = {
                    type: "list",
                    raw: a,
                    ordered: o,
                    start: o ? +l.slice(0, -1) : "",
                    loose: !1,
                    items: []
                }, p = e[0].match(this.rules.block.item), h = !1, u = p.length, d = this.rules.block.listItemStart.exec(p[0]), g = 0; g < u; g++) {
                    if (a = t = p[g],
                    g !== u - 1) {
                        if (i = this.rules.block.listItemStart.exec(p[g + 1]),
                        this.options.pedantic ? i[1].length > d[1].length : i[1].length > d[0].length || 3 < i[1].length) {
                            p.splice(g, 2, p[g] + "\n" + p[g + 1]),
                            g--,
                            u--;
                            continue
                        }
                        (!this.options.pedantic || this.options.smartLists ? i[2][i[2].length - 1] !== l[l.length - 1] : o == (1 === i[2].length)) && (n = p.slice(g + 1).join("\n"),
                        c.raw = c.raw.substring(0, c.raw.length - n.length),
                        g = u - 1),
                        d = i
                    }
                    i = t.length,
                    ~(t = t.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && (i -= t.length,
                    t = this.options.pedantic ? t.replace(/^ {1,4}/gm, "") : t.replace(new RegExp("^ {1," + i + "}","gm"), "")),
                    i = h || /\n\n(?!\s*$)/.test(t),
                    g !== u - 1 && (h = "\n" === t.charAt(t.length - 1),
                    i = i || h),
                    i && (c.loose = !0),
                    this.options.gfm && (s = void 0,
                    (r = /^\[[ xX]\] /.test(t)) && (s = " " !== t[1],
                    t = t.replace(/^\[[ xX]\] +/, ""))),
                    c.items.push({
                        type: "list_item",
                        raw: a,
                        task: r,
                        checked: s,
                        loose: i,
                        text: t
                    })
                }
                return c
            }
        }
        ,
        t.html = function(e) {
            if (e = this.rules.block.html.exec(e))
                return {
                    type: this.options.sanitize ? "paragraph" : "html",
                    raw: e[0],
                    pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]),
                    text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : T(e[0]) : e[0]
                }
        }
        ,
        t.def = function(e) {
            if (e = this.rules.block.def.exec(e))
                return e[3] && (e[3] = e[3].substring(1, e[3].length - 1)),
                {
                    tag: e[1].toLowerCase().replace(/\s+/g, " "),
                    raw: e[0],
                    href: e[2],
                    title: e[3]
                }
        }
        ,
        t.table = function(e) {
            if (e = this.rules.block.table.exec(e)) {
                var t = {
                    type: "table",
                    header: A(e[1].replace(/^ *| *\| *$/g, "")),
                    align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    cells: e[3] ? e[3].replace(/\n$/, "").split("\n") : []
                };
                if (t.header.length === t.align.length) {
                    t.raw = e[0];
                    for (var n = t.align.length, i = 0; i < n; i++)
                        /^ *-+: *$/.test(t.align[i]) ? t.align[i] = "right" : /^ *:-+: *$/.test(t.align[i]) ? t.align[i] = "center" : /^ *:-+ *$/.test(t.align[i]) ? t.align[i] = "left" : t.align[i] = null;
                    for (n = t.cells.length,
                    i = 0; i < n; i++)
                        t.cells[i] = A(t.cells[i].replace(/^ *\| *| *\| *$/g, ""), t.header.length);
                    return t
                }
            }
        }
        ,
        t.lheading = function(e) {
            if (e = this.rules.block.lheading.exec(e))
                return {
                    type: "heading",
                    raw: e[0],
                    depth: "=" === e[2].charAt(0) ? 1 : 2,
                    text: e[1]
                }
        }
        ,
        t.paragraph = function(e) {
            if (e = this.rules.block.paragraph.exec(e))
                return {
                    type: "paragraph",
                    raw: e[0],
                    text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1]
                }
        }
        ,
        t.text = function(e, t) {
            if (e = this.rules.block.text.exec(e))
                return (t = t[t.length - 1]) && "text" === t.type ? {
                    raw: e[0],
                    text: e[0]
                } : {
                    type: "text",
                    raw: e[0],
                    text: e[0]
                }
        }
        ,
        t.escape = function(e) {
            if (e = this.rules.inline.escape.exec(e))
                return {
                    type: "escape",
                    raw: e[0],
                    text: T(e[1])
                }
        }
        ,
        t.tag = function(e, t, n) {
            if (e = this.rules.inline.tag.exec(e))
                return !t && /^<a /i.test(e[0]) ? t = !0 : t && /^<\/a>/i.test(e[0]) && (t = !1),
                !n && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0]) ? n = !0 : n && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (n = !1),
                {
                    type: this.options.sanitize ? "text" : "html",
                    raw: e[0],
                    inLink: t,
                    inRawBlock: n,
                    text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : T(e[0]) : e[0]
                }
        }
        ,
        t.link = function(e) {
            var t = this.rules.inline.link.exec(e);
            if (t) {
                var n = t[2].trim();
                if (!this.options.pedantic && /^</.test(n)) {
                    if (!/>$/.test(n))
                        return;
                    if (e = R(n.slice(0, -1), "\\"),
                    (n.length - e.length) % 2 == 0)
                        return
                } else {
                    -1 < (r = E(t[2], "()")) && (s = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + r,
                    t[2] = t[2].substring(0, r),
                    t[0] = t[0].substring(0, s).trim(),
                    t[3] = "")
                }
                var i, r = t[2], s = "";
                return this.options.pedantic ? (i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r)) && (r = i[1],
                s = i[3]) : s = t[3] ? t[3].slice(1, -1) : "",
                r = r.trim(),
                L(t, {
                    href: (r = /^</.test(r) ? this.options.pedantic && !/>$/.test(n) ? r.slice(1) : r.slice(1, -1) : r) && r.replace(this.rules.inline._escapes, "$1"),
                    title: s && s.replace(this.rules.inline._escapes, "$1")
                }, t[0])
            }
        }
        ,
        t.reflink = function(e, t) {
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                if ((e = t[(e = (n[2] || n[1]).replace(/\s+/g, " ")).toLowerCase()]) && e.href)
                    return L(n, e, n[0]);
                var n = n[0].charAt(0);
                return {
                    type: "text",
                    raw: n,
                    text: n
                }
            }
        }
        ,
        t.strong = function(e, t, n) {
            void 0 === n && (n = "");
            var i = this.rules.inline.strong.start.exec(e);
            if (i && (!i[1] || i[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
                t = t.slice(-1 * e.length);
                var r, s = "**" === i[0] ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
                for (s.lastIndex = 0; null != (i = s.exec(t)); )
                    if (r = this.rules.inline.strong.middle.exec(t.slice(0, i.index + 3)))
                        return {
                            type: "strong",
                            raw: e.slice(0, r[0].length),
                            text: e.slice(2, r[0].length - 2)
                        }
            }
        }
        ,
        t.em = function(e, t, n) {
            void 0 === n && (n = "");
            var i = this.rules.inline.em.start.exec(e);
            if (i && (!i[1] || i[1] && ("" === n || this.rules.inline.punctuation.exec(n)))) {
                t = t.slice(-1 * e.length);
                var r, s = "*" === i[0] ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
                for (s.lastIndex = 0; null != (i = s.exec(t)); )
                    if (r = this.rules.inline.em.middle.exec(t.slice(0, i.index + 2)))
                        return {
                            type: "em",
                            raw: e.slice(0, r[0].length),
                            text: e.slice(1, r[0].length - 1)
                        }
            }
        }
        ,
        t.codespan = function(e) {
            var t = this.rules.inline.code.exec(e);
            if (t) {
                var n = t[2].replace(/\n/g, " ")
                  , i = /[^ ]/.test(n);
                e = /^ /.test(n) && / $/.test(n);
                return i && e && (n = n.substring(1, n.length - 1)),
                n = T(n, !0),
                {
                    type: "codespan",
                    raw: t[0],
                    text: n
                }
            }
        }
        ,
        t.br = function(e) {
            if (e = this.rules.inline.br.exec(e))
                return {
                    type: "br",
                    raw: e[0]
                }
        }
        ,
        t.del = function(e) {
            if (e = this.rules.inline.del.exec(e))
                return {
                    type: "del",
                    raw: e[0],
                    text: e[2]
                }
        }
        ,
        t.autolink = function(e, t) {
            if (e = this.rules.inline.autolink.exec(e)) {
                var n;
                t = "@" === e[2] ? "mailto:" + (n = T(this.options.mangle ? t(e[1]) : e[1])) : n = T(e[1]);
                return {
                    type: "link",
                    raw: e[0],
                    text: n,
                    href: t,
                    tokens: [{
                        type: "text",
                        raw: n,
                        text: n
                    }]
                }
            }
        }
        ,
        t.url = function(e, t) {
            var n, i, r, s;
            if (n = this.rules.inline.url.exec(e)) {
                if ("@" === n[2])
                    r = "mailto:" + (i = T(this.options.mangle ? t(n[0]) : n[0]));
                else {
                    for (; s = n[0],
                    n[0] = this.rules.inline._backpedal.exec(n[0])[0],
                    s !== n[0]; )
                        ;
                    i = T(n[0]),
                    r = "www." === n[1] ? "http://" + i : i
                }
                return {
                    type: "link",
                    raw: n[0],
                    text: i,
                    href: r,
                    tokens: [{
                        type: "text",
                        raw: i,
                        text: i
                    }]
                }
            }
        }
        ,
        t.inlineText = function(e, t, n) {
            if (e = this.rules.inline.text.exec(e))
                return n = t ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e[0]) : T(e[0]) : e[0] : T(this.options.smartypants ? n(e[0]) : e[0]),
                {
                    type: "text",
                    raw: e[0],
                    text: n
                }
        }
        ,
        e
    }();
    S = $,
    O = y,
    $ = z;
    (y = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
        html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
        def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
        nptable: S,
        table: S,
        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    }).def = O(y.def).replace("label", y._label).replace("title", y._title).getRegex(),
    y.bullet = /(?:[*+-]|\d{1,9}[.)])/,
    y.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/,
    y.item = O(y.item, "gm").replace(/bull/g, y.bullet).getRegex(),
    y.listItemStart = O(/^( *)(bull)/).replace("bull", y.bullet).getRegex(),
    y.list = O(y.list).replace(/bull/g, y.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + y.def.source + ")").getRegex(),
    y._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    y._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/,
    y.html = O(y.html, "i").replace("comment", y._comment).replace("tag", y._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    y.paragraph = O(y._paragraph).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", y._tag).getRegex(),
    y.blockquote = O(y.blockquote).replace("paragraph", y.paragraph).getRegex(),
    y.normal = $({}, y),
    y.gfm = $({}, y.normal, {
        nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
        table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
    }),
    y.gfm.nptable = O(y.gfm.nptable).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", y._tag).getRegex(),
    y.gfm.table = O(y.gfm.table).replace("hr", y.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", y._tag).getRegex(),
    y.pedantic = $({}, y.normal, {
        html: O("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", y._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: S,
        paragraph: O(y.normal._paragraph).replace("hr", y.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", y.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
    }),
    (S = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: S,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        strong: {
            start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
            middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
            endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
            endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/
        },
        em: {
            start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
            middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
            endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
            endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: S,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\s*punctuation])/,
        _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"
    }).punctuation = O(S.punctuation).replace(/punctuation/g, S._punctuation).getRegex(),
    S._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>",
    S._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*",
    S._comment = O(y._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
    S.em.start = O(S.em.start).replace(/punctuation/g, S._punctuation).getRegex(),
    S.em.middle = O(S.em.middle).replace(/punctuation/g, S._punctuation).replace(/overlapSkip/g, S._overlapSkip).getRegex(),
    S.em.endAst = O(S.em.endAst, "g").replace(/punctuation/g, S._punctuation).getRegex(),
    S.em.endUnd = O(S.em.endUnd, "g").replace(/punctuation/g, S._punctuation).getRegex(),
    S.strong.start = O(S.strong.start).replace(/punctuation/g, S._punctuation).getRegex(),
    S.strong.middle = O(S.strong.middle).replace(/punctuation/g, S._punctuation).replace(/overlapSkip/g, S._overlapSkip).getRegex(),
    S.strong.endAst = O(S.strong.endAst, "g").replace(/punctuation/g, S._punctuation).getRegex(),
    S.strong.endUnd = O(S.strong.endUnd, "g").replace(/punctuation/g, S._punctuation).getRegex(),
    S.blockSkip = O(S._blockSkip, "g").getRegex(),
    S.overlapSkip = O(S._overlapSkip, "g").getRegex(),
    S._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,
    S._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,
    S._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
    S.autolink = O(S.autolink).replace("scheme", S._scheme).replace("email", S._email).getRegex(),
    S._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
    S.tag = O(S.tag).replace("comment", S._comment).replace("attribute", S._attribute).getRegex(),
    S._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    S._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,
    S._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
    S.link = O(S.link).replace("label", S._label).replace("href", S._href).replace("title", S._title).getRegex(),
    S.reflink = O(S.reflink).replace("label", S._label).getRegex(),
    S.reflinkSearch = O(S.reflinkSearch, "g").replace("reflink", S.reflink).replace("nolink", S.nolink).getRegex(),
    S.normal = $({}, S),
    S.pedantic = $({}, S.normal, {
        strong: {
            start: /^__|\*\*/,
            middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g
        },
        link: O(/^!?\[(label)\]\((.*?)\)/).replace("label", S._label).getRegex(),
        reflink: O(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", S._label).getRegex()
    }),
    S.gfm = $({}, S.normal, {
        escape: O(S.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
    }),
    S.gfm.url = O(S.gfm.url, "i").replace("email", S.gfm._extended_email).getRegex(),
    S.breaks = $({}, S.gfm, {
        br: O(S.br).replace("{2,}", "*").getRegex(),
        text: O(S.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    });
    S = {
        block: y,
        inline: S
    };
    var B = s.defaults
      , j = S.block
      , M = S.inline
      , N = function(e, t) {
        if (t < 1)
            return "";
        for (var n = ""; 1 < t; )
            1 & t && (n += e),
            t >>= 1,
            e += e;
        return n + e
    };
    function q(e) {
        return e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…")
    }
    function H(e) {
        for (var t, n = "", i = e.length, r = 0; r < i; r++)
            t = e.charCodeAt(r),
            n += "&#" + (t = .5 < Math.random() ? "x" + t.toString(16) : t) + ";";
        return n
    }
    var Z = function() {
        function t(e) {
            this.tokens = [],
            this.tokens.links = Object.create(null),
            this.options = e || B,
            this.options.tokenizer = this.options.tokenizer || new C,
            this.tokenizer = this.options.tokenizer,
            this.tokenizer.options = this.options,
            e = {
                block: j.normal,
                inline: M.normal
            },
            this.options.pedantic ? (e.block = j.pedantic,
            e.inline = M.pedantic) : this.options.gfm && (e.block = j.gfm,
            this.options.breaks ? e.inline = M.breaks : e.inline = M.gfm),
            this.tokenizer.rules = e
        }
        t.lex = function(e, n) {
            return new t(n).lex(e)
        }
        ,
        t.lexInline = function(e, n) {
            return new t(n).inlineTokens(e)
        }
        ;
        var n, i, r = t.prototype;
        return r.lex = function(e) {
            return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "),
            this.blockTokens(e, this.tokens, !0),
            this.inline(this.tokens),
            this.tokens
        }
        ,
        r.blockTokens = function(e, t, n) {
            var i, r, s, a;
            for (void 0 === t && (t = []),
            void 0 === n && (n = !0),
            this.options.pedantic && (e = e.replace(/^ +$/gm, "")); e; )
                if (i = this.tokenizer.space(e))
                    e = e.substring(i.raw.length),
                    i.type && t.push(i);
                else if (i = this.tokenizer.code(e, t))
                    e = e.substring(i.raw.length),
                    i.type ? t.push(i) : ((a = t[t.length - 1]).raw += "\n" + i.raw,
                    a.text += "\n" + i.text);
                else if (i = this.tokenizer.fences(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.heading(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.nptable(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.hr(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.blockquote(e))
                    e = e.substring(i.raw.length),
                    i.tokens = this.blockTokens(i.text, [], n),
                    t.push(i);
                else if (i = this.tokenizer.list(e)) {
                    for (e = e.substring(i.raw.length),
                    s = i.items.length,
                    r = 0; r < s; r++)
                        i.items[r].tokens = this.blockTokens(i.items[r].text, [], !1);
                    t.push(i)
                } else if (i = this.tokenizer.html(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (n && (i = this.tokenizer.def(e)))
                    e = e.substring(i.raw.length),
                    this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
                        href: i.href,
                        title: i.title
                    });
                else if (i = this.tokenizer.table(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.lheading(e))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (n && (i = this.tokenizer.paragraph(e)))
                    e = e.substring(i.raw.length),
                    t.push(i);
                else if (i = this.tokenizer.text(e, t))
                    e = e.substring(i.raw.length),
                    i.type ? t.push(i) : ((a = t[t.length - 1]).raw += "\n" + i.raw,
                    a.text += "\n" + i.text);
                else if (e) {
                    var l = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(l);
                        break
                    }
                    throw new Error(l)
                }
            return t
        }
        ,
        r.inline = function(e) {
            for (var t, n, i, r, s, a = e.length, l = 0; l < a; l++)
                switch ((s = e[l]).type) {
                case "paragraph":
                case "text":
                case "heading":
                    s.tokens = [],
                    this.inlineTokens(s.text, s.tokens);
                    break;
                case "table":
                    for (s.tokens = {
                        header: [],
                        cells: []
                    },
                    i = s.header.length,
                    t = 0; t < i; t++)
                        s.tokens.header[t] = [],
                        this.inlineTokens(s.header[t], s.tokens.header[t]);
                    for (i = s.cells.length,
                    t = 0; t < i; t++)
                        for (r = s.cells[t],
                        s.tokens.cells[t] = [],
                        n = 0; n < r.length; n++)
                            s.tokens.cells[t][n] = [],
                            this.inlineTokens(r[n], s.tokens.cells[t][n]);
                    break;
                case "blockquote":
                    this.inline(s.tokens);
                    break;
                case "list":
                    for (i = s.items.length,
                    t = 0; t < i; t++)
                        this.inline(s.items[t].tokens)
                }
            return e
        }
        ,
        r.inlineTokens = function(e, t, n, i) {
            var r;
            void 0 === t && (t = []),
            void 0 === n && (n = !1),
            void 0 === i && (i = !1);
            var s, a, l, o = e;
            if (this.tokens.links) {
                var c = Object.keys(this.tokens.links);
                if (0 < c.length)
                    for (; null != (s = this.tokenizer.rules.inline.reflinkSearch.exec(o)); )
                        c.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, s.index) + "[" + N("a", s[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
            }
            for (; null != (s = this.tokenizer.rules.inline.blockSkip.exec(o)); )
                o = o.slice(0, s.index) + "[" + N("a", s[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (; e; )
                if (a || (l = ""),
                a = !1,
                r = this.tokenizer.escape(e))
                    e = e.substring(r.raw.length),
                    t.push(r);
                else if (r = this.tokenizer.tag(e, n, i))
                    e = e.substring(r.raw.length),
                    n = r.inLink,
                    i = r.inRawBlock,
                    t.push(r);
                else if (r = this.tokenizer.link(e))
                    e = e.substring(r.raw.length),
                    "link" === r.type && (r.tokens = this.inlineTokens(r.text, [], !0, i)),
                    t.push(r);
                else if (r = this.tokenizer.reflink(e, this.tokens.links))
                    e = e.substring(r.raw.length),
                    "link" === r.type && (r.tokens = this.inlineTokens(r.text, [], !0, i)),
                    t.push(r);
                else if (r = this.tokenizer.strong(e, o, l))
                    e = e.substring(r.raw.length),
                    r.tokens = this.inlineTokens(r.text, [], n, i),
                    t.push(r);
                else if (r = this.tokenizer.em(e, o, l))
                    e = e.substring(r.raw.length),
                    r.tokens = this.inlineTokens(r.text, [], n, i),
                    t.push(r);
                else if (r = this.tokenizer.codespan(e))
                    e = e.substring(r.raw.length),
                    t.push(r);
                else if (r = this.tokenizer.br(e))
                    e = e.substring(r.raw.length),
                    t.push(r);
                else if (r = this.tokenizer.del(e))
                    e = e.substring(r.raw.length),
                    r.tokens = this.inlineTokens(r.text, [], n, i),
                    t.push(r);
                else if (r = this.tokenizer.autolink(e, H))
                    e = e.substring(r.raw.length),
                    t.push(r);
                else if (n || !(r = this.tokenizer.url(e, H))) {
                    if (r = this.tokenizer.inlineText(e, i, q))
                        e = e.substring(r.raw.length),
                        l = r.raw.slice(-1),
                        a = !0,
                        t.push(r);
                    else if (e) {
                        var p = "Infinite loop on byte: " + e.charCodeAt(0);
                        if (this.options.silent) {
                            console.error(p);
                            break
                        }
                        throw new Error(p)
                    }
                } else
                    e = e.substring(r.raw.length),
                    t.push(r);
            return t
        }
        ,
        n = t,
        i = [{
            key: "rules",
            get: function() {
                return {
                    block: j,
                    inline: M
                }
            }
        }],
        (r = null) && e(n.prototype, r),
        i && e(n, i),
        t
    }()
      , P = s.defaults
      , U = function(e, t, n) {
        if (e) {
            var i;
            try {
                i = decodeURIComponent(u(n)).replace(g, "").toLowerCase()
            } catch (e) {
                return null
            }
            if (0 === i.indexOf("javascript:") || 0 === i.indexOf("vbscript:") || 0 === i.indexOf("data:"))
                return null
        }
        t && !f.test(n) && (n = function(e, t) {
            m[" " + e] || (k.test(e) ? m[" " + e] = e + "/" : m[" " + e] = _(e, "/", !0));
            var n = -1 === (e = m[" " + e]).indexOf(":");
            return "//" === t.substring(0, 2) ? n ? t : e.replace(b, "$1") + t : "/" === t.charAt(0) ? n ? t : e.replace(x, "$1") + t : e + t
        }(t, n));
        try {
            n = encodeURI(n).replace(/%25/g, "%")
        } catch (e) {
            return null
        }
        return n
    }
      , D = w
      , F = function() {
        function e(e) {
            this.options = e || P
        }
        var t = e.prototype;
        return t.code = function(e, t, n) {
            var i = (t || "").match(/\S*/)[0];
            return !this.options.highlight || null != (t = this.options.highlight(e, i)) && t !== e && (n = !0,
            e = t),
            e = e.replace(/\n$/, "") + "\n",
            i ? '<pre><code class="' + this.options.langPrefix + D(i, !0) + '">' + (n ? e : D(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : D(e, !0)) + "</code></pre>\n"
        }
        ,
        t.blockquote = function(e) {
            return "<blockquote class='hpp_blockquote'>\n" + e + "</blockquote>\n"
        }
        ,
        t.html = function(e) {
            return e
        }
        ,
        t.heading = function(e, t, n, i) {
            return this.options.headerIds ? "<h" + t + ' id="' + this.options.headerPrefix + i.slug(n) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n"
        }
        ,
        t.hr = function() {
            return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
        }
        ,
        t.list = function(e, t, n) {
            var i = t ? "ol" : "ul";
            return "<" + i + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + i + ">\n"
        }
        ,
        t.listitem = function(e) {
            return "<li>" + e + "</li>\n"
        }
        ,
        t.checkbox = function(e) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
        }
        ,
        t.paragraph = function(e) {
            return "<p>" + e + "</p>\n"
        }
        ,
        t.table = function(e, t) {
            return "<table class='table'>\n<thead>\n" + e + "</thead>\n" + (t = t && "<tbody>" + t + "</tbody>") + "</table>\n"
        }
        ,
        t.tablerow = function(e) {
            return "<tr>\n" + e + "</tr>\n"
        }
        ,
        t.tablecell = function(e, t) {
            var n = t.header ? "th" : "td";
            return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n"
        }
        ,
        t.strong = function(e) {
            return "<strong>" + e + "</strong>"
        }
        ,
        t.em = function(e) {
            return "<em>" + e + "</em>"
        }
        ,
        t.codespan = function(e) {
            return "<code>" + e + "</code>"
        }
        ,
        t.br = function() {
            return this.options.xhtml ? "<br/>" : "<br>"
        }
        ,
        t.del = function(e) {
            return "<del>" + e + "</del>"
        }
        ,
        t.link = function(e, t, n) {
            return null === (e = U(this.options.sanitize, this.options.baseUrl, e)) ? n : (e = '<a href="' + D(e) + '"',
            t && (e += ' title="' + t + '"'),
            e + ">" + n + "</a>")
        }
        ,
        t.image = function(e, t, n) {
            return null === (e = U(this.options.sanitize, this.options.baseUrl, e)) ? n : (n = '<img referrerpolicy="no-referrer" class="hpp_pre" src="' + e + '" alt="' + n + '"',
            t && (n += ' title="' + t + '"'),
            n + (this.options.xhtml ? "/>" : ">"))
        }
        ,
        t.text = function(e) {
            return e
        }
        ,
        e
    }()
      , J = function() {
        function e() {}
        var t = e.prototype;
        return t.strong = function(e) {
            return e
        }
        ,
        t.em = function(e) {
            return e
        }
        ,
        t.codespan = function(e) {
            return e
        }
        ,
        t.del = function(e) {
            return e
        }
        ,
        t.html = function(e) {
            return e
        }
        ,
        t.text = function(e) {
            return e
        }
        ,
        t.link = function(e, t, n) {
            return "" + n
        }
        ,
        t.image = function(e, t, n) {
            return "" + n
        }
        ,
        t.br = function() {
            return ""
        }
        ,
        e
    }()
      , X = function() {
        function e() {
            this.seen = {}
        }
        var t = e.prototype;
        return t.serialize = function(e) {
            return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-")
        }
        ,
        t.getNextSafeSlug = function(e, t) {
            var n = e
              , i = 0;
            if (this.seen.hasOwnProperty(n))
                for (i = this.seen[e]; n = e + "-" + ++i,
                this.seen.hasOwnProperty(n); )
                    ;
            return t || (this.seen[e] = i,
            this.seen[n] = 0),
            n
        }
        ,
        t.slug = function(e, t) {
            void 0 === t && (t = {});
            var n = this.serialize(e);
            return this.getNextSafeSlug(n, t.dryrun)
        }
        ,
        e
    }()
      , Y = s.defaults
      , G = v
      , K = function() {
        function e(e) {
            this.options = e || Y,
            this.options.renderer = this.options.renderer || new F,
            this.renderer = this.options.renderer,
            this.renderer.options = this.options,
            this.textRenderer = new J,
            this.slugger = new X
        }
        e.parse = function(t, n) {
            return new e(n).parse(t)
        }
        ,
        e.parseInline = function(t, n) {
            return new e(n).parseInline(t)
        }
        ;
        var t = e.prototype;
        return t.parse = function(e, t) {
            void 0 === t && (t = !0);
            for (var n, i, r, s, a, l, o, c, p, h, u, d, g, f, m, k = "", b = e.length, x = 0; x < b; x++)
                switch ((c = e[x]).type) {
                case "space":
                    continue;
                case "hr":
                    k += this.renderer.hr();
                    continue;
                case "heading":
                    k += this.renderer.heading(this.parseInline(c.tokens), c.depth, G(this.parseInline(c.tokens, this.textRenderer)), this.slugger);
                    continue;
                case "code":
                    k += this.renderer.code(c.text, c.lang, c.escaped);
                    continue;
                case "table":
                    for (l = p = "",
                    r = c.header.length,
                    n = 0; n < r; n++)
                        l += this.renderer.tablecell(this.parseInline(c.tokens.header[n]), {
                            header: !0,
                            align: c.align[n]
                        });
                    for (p += this.renderer.tablerow(l),
                    o = "",
                    r = c.cells.length,
                    n = 0; n < r; n++) {
                        for (l = "",
                        s = (a = c.tokens.cells[n]).length,
                        i = 0; i < s; i++)
                            l += this.renderer.tablecell(this.parseInline(a[i]), {
                                header: !1,
                                align: c.align[i]
                            });
                        o += this.renderer.tablerow(l)
                    }
                    k += this.renderer.table(p, o);
                    continue;
                case "blockquote":
                    o = this.parse(c.tokens),
                    k += this.renderer.blockquote(o);
                    continue;
                case "list":
                    for (p = c.ordered,
                    _ = c.start,
                    h = c.loose,
                    r = c.items.length,
                    o = "",
                    n = 0; n < r; n++)
                        g = (d = c.items[n]).checked,
                        f = d.task,
                        u = "",
                        d.task && (m = this.renderer.checkbox(g),
                        h ? 0 < d.tokens.length && "text" === d.tokens[0].type ? (d.tokens[0].text = m + " " + d.tokens[0].text,
                        d.tokens[0].tokens && 0 < d.tokens[0].tokens.length && "text" === d.tokens[0].tokens[0].type && (d.tokens[0].tokens[0].text = m + " " + d.tokens[0].tokens[0].text)) : d.tokens.unshift({
                            type: "text",
                            text: m
                        }) : u += m),
                        u += this.parse(d.tokens, h),
                        o += this.renderer.listitem(u, f, g);
                    k += this.renderer.list(o, p, _);
                    continue;
                case "html":
                    k += this.renderer.html(c.text);
                    continue;
                case "paragraph":
                    k += this.renderer.paragraph(this.parseInline(c.tokens));
                    continue;
                case "text":
                    for (o = c.tokens ? this.parseInline(c.tokens) : c.text; x + 1 < b && "text" === e[x + 1].type; )
                        o += "\n" + ((c = e[++x]).tokens ? this.parseInline(c.tokens) : c.text);
                    k += t ? this.renderer.paragraph(o) : o;
                    continue;
                default:
                    var _ = 'Token with "' + c.type + '" type was not found.';
                    if (this.options.silent)
                        return void console.error(_);
                    throw new Error(_)
                }
            return k
        }
        ,
        t.parseInline = function(e, t) {
            t = t || this.renderer;
            for (var n, i = "", r = e.length, s = 0; s < r; s++)
                switch ((n = e[s]).type) {
                case "escape":
                    i += t.text(n.text);
                    break;
                case "html":
                    i += t.html(n.text);
                    break;
                case "link":
                    i += t.link(n.href, n.title, this.parseInline(n.tokens, t));
                    break;
                case "image":
                    i += t.image(n.href, n.title, n.text);
                    break;
                case "strong":
                    i += t.strong(this.parseInline(n.tokens, t));
                    break;
                case "em":
                    i += t.em(this.parseInline(n.tokens, t));
                    break;
                case "codespan":
                    i += t.codespan(n.text);
                    break;
                case "br":
                    i += t.br();
                    break;
                case "del":
                    i += t.del(this.parseInline(n.tokens, t));
                    break;
                case "text":
                    i += t.text(n.text);
                    break;
                default:
                    var a = 'Token with "' + n.type + '" type was not found.';
                    if (this.options.silent)
                        return void console.error(a);
                    throw new Error(a)
                }
            return i
        }
        ,
        e
    }()
      , V = z
      , Q = function(e) {
        e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
    }
      , W = w
      , ee = (w = s.getDefaults,
    s.changeDefaults);
    s = s.defaults;
    function te(e, t, n) {
        if (null == e)
            throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e)
            throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        if ("function" == typeof t && (n = t,
        t = null),
        t = V({}, te.defaults, t || {}),
        Q(t),
        n) {
            var i, r = t.highlight;
            try {
                i = Z.lex(e, t)
            } catch (e) {
                return n(e)
            }
            var s = function(e) {
                var s;
                if (!e)
                    try {
                        s = K.parse(i, t)
                    } catch (s) {
                        e = s
                    }
                return t.highlight = r,
                e ? n(e) : n(null, s)
            };
            if (!r || r.length < 3)
                return s();
            if (delete t.highlight,
            !i.length)
                return s();
            var a = 0;
            return te.walkTokens(i, (function(e) {
                "code" === e.type && (a++,
                setTimeout((function() {
                    r(e.text, e.lang, (function(t, n) {
                        return t ? s(t) : (null != n && n !== e.text && (e.text = n,
                        e.escaped = !0),
                        void (0 == --a && s()))
                    }
                    ))
                }
                ), 0))
            }
            )),
            void (0 === a && s())
        }
        try {
            var l = Z.lex(e, t);
            return t.walkTokens && te.walkTokens(l, t.walkTokens),
            K.parse(l, t)
        } catch (e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.",
            t.silent)
                return "<p>An error occurred:</p><pre>" + W(e.message + "", !0) + "</pre>";
            throw e
        }
    }
    return te.options = te.setOptions = function(e) {
        return V(te.defaults, e),
        ee(te.defaults),
        te
    }
    ,
    te.getDefaults = w,
    te.defaults = s,
    te.use = function(e) {
        var t, n = V({}, e);
        e.renderer && function() {
            var t, i = te.defaults.renderer || new F;
            for (t in e.renderer)
                !function(t) {
                    var n = i[t];
                    i[t] = function() {
                        for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
                            s[a] = arguments[a];
                        var l = e.renderer[t].apply(i, s);
                        return !1 === l ? n.apply(i, s) : l
                    }
                }(t);
            n.renderer = i
        }(),
        e.tokenizer && function() {
            var t, i = te.defaults.tokenizer || new C;
            for (t in e.tokenizer)
                !function(t) {
                    var n = i[t];
                    i[t] = function() {
                        for (var r = arguments.length, s = new Array(r), a = 0; a < r; a++)
                            s[a] = arguments[a];
                        var l = e.tokenizer[t].apply(i, s);
                        return !1 === l ? n.apply(i, s) : l
                    }
                }(t);
            n.tokenizer = i
        }(),
        e.walkTokens && (t = te.defaults.walkTokens,
        n.walkTokens = function(n) {
            e.walkTokens(n),
            t && t(n)
        }
        ),
        te.setOptions(n)
    }
    ,
    te.walkTokens = function(e, t) {
        for (var i, r = n(e); !(i = r()).done; ) {
            var s = i.value;
            switch (t(s),
            s.type) {
            case "table":
                for (var a = n(s.tokens.header); !(l = a()).done; ) {
                    var l = l.value;
                    te.walkTokens(l, t)
                }
                for (var o, c = n(s.tokens.cells); !(o = c()).done; )
                    for (var p = n(o.value); !(h = p()).done; ) {
                        var h = h.value;
                        te.walkTokens(h, t)
                    }
                break;
            case "list":
                te.walkTokens(s.items, t);
                break;
            default:
                s.tokens && te.walkTokens(s.tokens, t)
            }
        }
    }
    ,
    te.parseInline = function(e, t) {
        if (null == e)
            throw new Error("marked.parseInline(): input parameter is undefined or null");
        if ("string" != typeof e)
            throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
        t = V({}, te.defaults, t || {}),
        Q(t);
        try {
            var n = Z.lexInline(e, t);
            return t.walkTokens && te.walkTokens(n, t.walkTokens),
            K.parseInline(n, t)
        } catch (e) {
            if (e.message += "\nPlease report this to https://github.com/markedjs/marked.",
            t.silent)
                return "<p>An error occurred:</p><pre>" + W(e.message + "", !0) + "</pre>";
            throw e
        }
    }
    ,
    te.Parser = K,
    te.parser = K.parse,
    te.Renderer = F,
    te.TextRenderer = J,
    te.Lexer = Z,
    te.lexer = Z.lex,
    te.Tokenizer = C,
    te.Slugger = X,
    te.parse = te
}
)),
localStorage.setItem("hpp_start", 0);
var input = document.getElementById("input");
function readFile() {
    swal({
        title: "\n上传中...",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",
        text: "\n",
        button: !1,
        closeModal: !1
    });
    var e = this.files[0]
      , t = e.name.substring(e.name.lastIndexOf(".") + 1)
      , n = new FileReader;
    n.readAsDataURL(e),
    n.onloadstart = function(e) {}
    ,
    n.onprogress = function(e) {}
    ,
    n.onload = function(e) {
        hpp_uploadimage(this.result.substring(this.result.indexOf(",") + 1), t)
    }
    ,
    n.onloadend = function(e) {}
}
function hpp_uploadimage(e, t) {
    var n = ajaxObject();
    n.open("post", "/hpp/admin/api/addimage/" + t, !0),
    n.setRequestHeader("Content-Type", "text/plain"),
    n.onreadystatechange = function() {
        4 == n.readyState && (200 == n.status ? (swal.close(),
        sweetAlert("成功", "图片已更新", "success")) : 201 == n.status ? (swal.close(),
        hpp_add_mark(`![](${n.responseText})`),
        sweetAlert("成功", "图片已上传", "success")) : (swal.close(),
        sweetAlert("糟糕", "上传图片失败!", "error")))
    }
    ,
    n.send(e)
}
function encodeHtml(str){  
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&/g,"&amp;");
             s = s.replace(/</g,"&lt;");
             s = s.replace(/>/g,"&gt;");
             s = s.replace(/ /g,"&nbsp;");
             s = s.replace(/\'/g,"&#39;");
             s = s.replace(/\"/g,"&quot;");
             return s;  
       }
function hpp_upload_md() {
    swal({
        title: "\n上传中...",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",
        text: "\n",
        button: !1,
        closeModal: !1
    });
    let e = document.getElementById("text_hpp_talk_editor").value
      , t = new Date
      , n = {
        time: t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes(),
        content: e,
        avatar: avatar,
        name: username
    };
    n = JSON.stringify(n);
    var i = ajaxObject();
    i.open("get", "https://daodao-alpha.vercel.app/api?c=" + encodeURIComponent(e) + "&k=Cuide5942b",0),
    i.send(),
    i.open("post", "/hpp/admin/api/addtalk", !0),
    i.setRequestHeader("Content-Type", "text/plain"),
    i.onreadystatechange = function() {
        4 == i.readyState && (200 == i.status ? (swal.close(),
        localStorage.setItem("hpp_talk_backup", ""),
        swal("成功上传说说", "", {
            icon: "success",
            buttons: {
                yes: "是"
            }
        }).then((e=>{
            window.location.reload()
        }
        ))) : (swal.close(),
        sweetAlert("糟糕", "上传说说失败!", "error"),
        mdeditor.disabled = !1))
    }
    ,
    i.send(n)
}
input.addEventListener("change", readFile, !1),
new hpp_talk({
    id: "hpp_talk",
    domain: window.location.host,
    limit: 10,
    start: 0
}),
new hpp_md_editor({
    ele: "hpp_talk_editor",
    data_name: "talk",
    owo: hpp_OwO,
    backuptime: 6e4
}),
marked.setOptions({
    renderer: new marked.Renderer,
    gfm: !0,
    tables: !0,
    breaks: !1,
    pedantic: !1,
    sanitize: !1,
    smartLists: !0,
    smartypants: !1,
    highlight: function(e) {
        return hljs.highlightAuto(e).value
    }
});
