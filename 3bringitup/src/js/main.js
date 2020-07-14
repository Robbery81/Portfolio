//import Slider from './modules/slider/slider';
import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import playVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({
        container: '.page',
        btns: '.next'
    });
    slider.render();

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
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    let player = new playVideo('.showup .play', '.overlay');
    player.init();
});