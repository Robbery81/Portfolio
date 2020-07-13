import Slider from './modules/slider';
import playVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    let slider = new Slider('.page', '.next');
    slider.render();

    let player = new playVideo('.showup .play', '.overlay');
    player.init();
});