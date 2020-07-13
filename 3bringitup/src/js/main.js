import Slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    let slider = new Slider('.page', '.next');
    slider.render();
});