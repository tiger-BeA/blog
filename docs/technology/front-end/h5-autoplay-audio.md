---
title: H5 端背景音乐自动播放
tag: 备忘
---

# H5 端背景音乐自动播放

```js
const MusicUtil = {
    init() {
        let self = this;
        self.pauseForce = false; // 是否强制关闭音乐
        self.bgAudio = new Audio();
        self.view();
        self.listen();
    },
    view() {
        let self = this;
        self.fMusicInit();
    },
    listen() {
        let self = this;
        $(document).ready(() => {
            document.addEventListener('NEJsbridgeReady', () => {
                self.fPlay(self.bgAudio, PATH_MUSIC)
            }, false);
            document.addEventListener('WeixinJSBridgeReady', () => {
                self.fPlay(self.bgAudio, PATH_MUSIC)
            }, false);
            document.addEventListener('YixinJSBridgeReady', () => {
                self.fPlay(self.bgAudio, PATH_MUSIC)
            }, false);
        });
    },
    fMusicInit() {
        let self = this;
        self.bgAudio.loadStatus = 'unload';
        self.bgAudio.loop = true;
        self.bgAudio.addEventListener('playing' ,function (e) {
            // 控制背景音乐播放暂停的按钮
            $btnAudio.removeClass('f-pause');
        });
        self.bgAudio.addEventListener('pause' ,function (e) {
            $btnAudio.addClass('f-pause');
        });
        $('body').one('touchstart', function (e) {
            self.fPlay(self.bgAudio, PATH_MUSIC);
            $btnAudio.on('click', function (e) {
                if (self.bgAudio.paused) {
                    self.fPlay(self.bgAudio, PATH_MUSIC);
                    self.pauseForce = false;
                    return false;
                }
                self.pauseForce = true;
                self.fPause(self.bgAudio);
            });
        });
        self.fPlay(self.bgAudio, PATH_MUSIC);
    },
    fPlay(_media, _url) {
        let self = this;
        if (_media.loadStatus === 'unload') {
            self.fLoad(_media, _url, () => {
                self.fPlay(_media, _url);
            });
            return false;
        }
        _media.play();
    },
    fLoad(_media, _url, _cb) {
        let self = this;
        _media.src = _url;
        _media.load();
        _media.addEventListener('canplaythrough', function () {
            _media.loadStatus = 'loaded';
            _cb();
        });
        _media.addEventListener('loadstart', function () {
            _media.loadStatus = 'loading';
        });
    },
    fPause(_media) {
        let self = this;
        _media.pause();
    },
}
// 自动播放
MusicUtil.init();
```
