import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';

document.addEventListener('DOMContentLoaded', () => {
    let modalState = {};
    
    modals();
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');//all tab content active
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState);
    changeModalState(modalState);
    timer('.container1', new Date('2020-07-02T03:24:00'));
    images();
});