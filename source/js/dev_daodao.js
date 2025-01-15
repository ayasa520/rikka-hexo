
function DaodaoSwiper(url,bbpath,filter){
    this.url = url;
    this.bbpath = bbpath;
    this.filter = filter;
    this.init = function(){
        dataGetter("get",this.url,null,function(result,ddpath=bbpath,ddfilter=filter){ generateBBHtml(result.data,bbpath,filter)});
    }
    function generateBBHtml(array,ddpath,ddfilter) {
        var bbdom = document.querySelector('#bber-talk');
        var result = '';
        let array_list_num;
        if (array.length < 10) {
            array_list_num = array.length
        } else {
            array_list_num = 10
        }
        for (let i = 0; i < array_list_num; i++) {
            var flag_daodao = true
            for (let item of ddfilter) {
                if (array[i].content.indexOf(item) >= 0) {
                    flag_daodao = false
                }
            }
            if (flag_daodao) {
                var tempp = document.createElement('p');
                tempp.innerHTML = array[i].content;
                array[i].content = tempp.innerText;
                tempp = null;
                result += `<div class='li-style swiper-slide' ><a style="height=100%;weight=100%" href="${ddpath}#${array[i]._id}">${array[i].content}</a></div>`;
            }
        }
        var bbdom = document.querySelector('#bber-talk');
        bbdom.innerHTML = result;
        window.lazyLoadInstance && window.lazyLoadInstance.update();
        window.pjax && window.pjax.refresh(bbdom);
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
        });
    }
}
    


