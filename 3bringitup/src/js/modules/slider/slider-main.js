import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }
    
    showSlide(n) {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        if (this.slideNumber == 0) {
            this.slideNumber = this.slides.length;
        }

        if (this.slideNumber == this.slides.length + 1) {
            this.slideNumber = 1;
        }

        this.slides[this.slideNumber - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlide(this.slideNumber += n);
    }

    showFloatElement(slideIndex, elementSelector, delay) {

        if (this.slideNumber == slideIndex) {
            let item = document.querySelector(elementSelector);
            item.style.display = 'none';

            setTimeout(() => {
                item.classList.remove("fadeOutDown");
                item.classList.add('animated', "fadeInUp");
                item.style.display = 'block';
            }, delay);
        }
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
                this.showFloatElement(2, '.hanson', 3000);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideNumber = 1;
                this.showSlide(this.slideNumber);
            });
        });
        

        this.showSlide(this.slideNumber);
    }
}