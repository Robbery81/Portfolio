export default class PlayVideo {
    constructor(trigers, overlay) {
        this.btns = document.querySelectorAll(trigers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    showOverlay() {
        this.overlay.style.display = 'flex';
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            console.log(this.player);
            this.player.stopVideo();
            //this.player.destroy();
        });
    }

    bindTrigers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showOverlay();
                
                if (!this.player) {
                    let path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
        });
    }

    init() {
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTrigers();
        this.bindCloseBtn();
    }
}