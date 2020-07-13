//import Slider from './modules/slider/slider';
import MainSlider from './modules/slider/slider-main';
import playVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    let slider = new MainSlider({page: '.page', btns: '.next'});
    slider.render();

    let player = new playVideo('.showup .play', '.overlay');
    player.init();
});