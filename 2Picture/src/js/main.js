import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import tabs from './modules/tabs';
import changeImg from './modules/changeImg';
import accordion from './modules/accordion';
import burgerMenu from './modules/burgerMenu';
import scrollPage from './modules/scrollPage';
import drop from './modules/drop';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vervical');
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="message"]');
    checkTextInputs('[name="name"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc('.calc_form', '#size', '#material', '#options', '.promocode', '.calc-price');
    tabs('.portfolio-menu', '#portfolio img');
    changeImg('.sizes-block');
    accordion('.accordion-heading', '.accordion-block');
    burgerMenu( '.burger-menu','.burger');
    scrollPage('.pageup');
    drop();
});