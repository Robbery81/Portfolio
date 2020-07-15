export default class PlayVideo {
    constructor(trigers, overlay) {
        this.btns = document.querySelectorAll(trigers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            try {
                this.player.stopVideo();
                //this.player.destroy();
            }catch(e){}
        });
    }

    bindTrigers() {
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || 
                     btn.closest('.module__video-item').getAttribute('data-disabled') !== "true") {
                    this.activeBtn = btn;
                    this.overlay.style.display = 'flex';
                    if (document.querySelector('iframe#frame')) {
                        
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        } 
                    } else {
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    onPlayerStateChange(state) {
        try{
            
        let blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
        let playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

        if (state.data === 0) {
            if (blockedElem.querySelector('.play__circle').classList.contains('closed')){
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtn);
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.querySelector('.play__text').classList.remove('attention');
                blockedElem.style.opacity = '1';
                blockedElem.style.filter = 'none';
                blockedElem.removeAttribute('data-disabled');
            }
        }
        }catch(e){}
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });
    }

    init() {
        if (this.btns.length > 0) {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";

            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTrigers();
            this.bindCloseBtn();
        }
    }
}