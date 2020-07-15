export default class Slider {
    constructor({container  = null, 
        btns  = null, 
        next = null, 
        prev = null,
        nextModule = null, 
        prevModule = null,
        activeClass = '',
        autoplay = false,
        animate = false,
        slideClass = false} = {}) {
        this.container = document.querySelector(container);
        try{this.slides = this.container.children;}catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.nextModule = nextModule;
        this.prevModule = prevModule;
        this.activeClass = activeClass;
        this.autoplay = autoplay;
        this.animate = animate;
        this.slideNumber = 1;
        this.slideClass = slideClass;
    }

    
}