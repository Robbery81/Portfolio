export default class Slider {
    constructor({container  = null, 
        btns  = null, 
        next = null, 
        prev = null,
        activeClass = '',
        autoplay = false,
        animate = false} = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.autoplay = autoplay;
        this.animate = animate;
        this.slideNumber = 1;
    }

    
}