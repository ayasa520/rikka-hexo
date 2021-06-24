const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
      {
        name: "Ensemble for Polaris",
        artist: "六花,乃藍",
        url: "https://box.nju.edu.cn/f/d3b26a05eb68403da79a/?dl=1",
        cover: "https://p2.music.126.net/7KtLN3AsNWkxgE7TVsM3ew==/109951165870850454.jpg?param=300x300"
      },
      {

        name: "dual existence",
        artist: "fripSide",
        url: "https://box.nju.edu.cn/f/0928933cb8e045de8d23/?dl=1", // 音频播放地址
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/dual existence.mp3", // 音频播放地址

        cover: "https://p3.music.126.net/5t-dQNecDB00cFHj_V2l-g==/109951165221579294.jpg?param=130y130",
      },
      {
        name: "eternal reality",
        artist: "fripSide",
        url: "https://box.nju.edu.cn/f/ec01a46c4d304552a48a/?dl=1", // 音频播放地址
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/eternal reality.mp3", // 音频播放地址

        cover: "https://p4.music.126.net/pdgyp7UkzKv8VfqA5KpNGQ==/109951165549613925.jpg?param=130y130",
      },
      {
        name: "final phase",
        artist: "fripSide",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/final phase.mp3", // 音频播放地址
        url: "https://box.nju.edu.cn/f/20a797a737994e658178/?dl=1", // 音频播放地址

        cover: "https://p1.music.126.net/lXy9u1Toxy0xDAhXzqIMjQ==/109951164863741970.jpg?param=130y130",
      },
      {
        name: "LEVEL5-Judgelight-",
        artist: "fripSide",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/LEVEL5-Judgelight-.mp3", // 音频播放地址
        url: "https://box.nju.edu.cn/f/c4026ed1719d4d59a18c/?dl=1", // 音频播放地址

        cover: "https://p2.music.126.net/DjmKdzlQU7eXaGZ7H6lZmg==/109951163118580658.jpg?param=130y130",
      }
      ,{
        name: "Memory of Snow",
        artist: "fripSide",
        url: "https://box.nju.edu.cn/f/49b8d39b4dac47108a2f/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/memory of snow.mp3",

        cover: "https://p1.music.126.net/ZjmjLnyBxxc4cRBO_qiKbg==/109951165461157383.jpg?param=130y130"
      },
      {
        name: "Only My Railgun",
        artist: "fripSide",
        url: "https://box.nju.edu.cn/f/424f958a8c42442dbe37/?dl=1", // 音频播放地址
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/Only My Railgun.mp3", // 音频播放地址

        cover: "https://p2.music.126.net/DjmKdzlQU7eXaGZ7H6lZmg==/109951163118580658.jpg?param=130y130",
      },
      {
        name: "sister's noise",
        artist: "fripSide",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/sister's noise.mp3", // 音频播放地址
        url: "https://box.nju.edu.cn/f/8d2e051e7dba4e259320/?dl=1", // 音频播放地址

        cover: "https://p2.music.126.net/p3DKJj-nxcoI8csvbrAOTQ==/109951163534584687.jpg?param=130y130",
      },

      {
        name: "神保町哀歌",
        artist: "铃木爱奈",
        url: "https://box.nju.edu.cn/f/2afe298600f54223a5b6/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/鈴木愛奈 - 神保町哀歌.mp3",
        cover: "https://p2.music.126.net/vR7O0TyJ8ZhFHPCTDNEjFA==/109951164887330112.jpg?param=130y130"
      },
      {
        name: "灶门炭治郎之歌钢琴版",
        artist: "Apr光",
        url: "https://box.nju.edu.cn/f/9a93f9b08e714366bc3f/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/Apr光 - 【钢琴】鬼灭之刃19集ED 竈門炭治郎のうた即兴版（翻自 中川奈美）.mp3",

        cover: "http://i1.hdslb.com/bfs/archive/dc0a57fb725806902321a737c5e9e4a8da11d62c.jpg?param=130y130@380w_240h_100Q_1c.webp"
      },
      {
        name: "告白の夜",
        artist: "Ayasa绚沙",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/Ayasa绚沙 - 告白の夜.mp3",
        url: "https://box.nju.edu.cn/f/5308136acf0c4cd79781/?dl=1",

        cover: "https://p2.music.126.net/nNIX5GT6dfVSheiQU4QtfQ==/109951163984605821.jpg?param=130y130"
      },
      {
        name: "STYX HELIX",
        artist: "MYTH & ROID",
        url: "https://box.nju.edu.cn/f/3c7d020e38774ff2affe/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/MYTH & ROID - STYX HELIX.mp3",

        cover: "https://p1.music.126.net/zS92B4iboeu50sEkXBeLfA==/1400777824444934.jpg?param=130y130"
       },
      {
        name: "中川奈美 - 竈門炭治郎のうた",
        artist: "中川奈美",
        url: "https://box.nju.edu.cn/f/ec5af680f1a04e68bcf6/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/中川奈美 - 竈門炭治郎のうた~1.mp3",

        cover: "https://p1.music.126.net/hq9g3-7lBQoUIYA7kHGWmQ==/109951164428837079.jpg?param=130y130"
      },
      {
        name: "Swan Song",
        artist: "Ayasa绚沙",
        url: "https://box.nju.edu.cn/f/d3ceb50ac0724babb752/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/Ayasa绚沙-SWAN SONG.mp3",

        cover: "https://p2.music.126.net/ZnCD0C7KQ3QbY9LiONijyA==/109951164482414399.jpg?param=130y130"
      },
      {
        name: "いけないボーダーライン",
        artist: "ワルキューレ",
        url: "https://box.nju.edu.cn/f/c49de4038503474b9ecd/?dl=1",
        // url: "https://cdn.jsdelivr.net/gh/ayasa520/ayasa520.github.io/music/ワルキューレ - いけないボーダーライン.mp3",

        cover: "https://p1.music.126.net/EpvRu9huSmOblnMjlrlERg==/109951163557728153.jpg?param=130y130"
      },
       {
        name: "鈴木雅之,鈴木愛理 - DADDY! DADDY! DO!",
        artist: "鈴木雅之,鈴木愛理",
        url: "https://box.nju.edu.cn/f/f8391996d73b495a8987/?dl=1",
        cover: "https://p2.music.126.net/FAlJKBaKuQyvnbHbIOy4rg==/109951164900117377.jpg?param=140y140"
      },
    ]
});