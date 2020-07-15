//import Slider from './modules/slider/slider';
import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import PlayVideo from './modules/playVideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import Accordeon from './modules/accordeon';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const mainPageSlider = new MainSlider({
        container: '.page',
        btns: '.next'
    });
    mainPageSlider.render();

    const secondMaineSlider = new MainSlider({
        container: '.moduleapp',
        btns: '.next',
        nextModule: '.nextmodule',
        prevModule: '.prevmodule'
    });
    secondMaineSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider', 
        next: '.modules__info-btns .slick-next', 
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider', 
        next: '.feed__slider .slick-next', 
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active',
        slideClass: 'feed__item'
    });
    feedSlider.init();

    new PlayVideo('.showup .play', '.overlay').init();
    new PlayVideo('.module__video-item .play', '.overlay').init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Forms('form').init();

    new Accordeon('.module__info-show .plus').init();
    new Download('.download').init();
});