export default class Accordeon {
    constructor(tiggersSelector) {
        this.btns = document.querySelectorAll(tiggersSelector);
    }
    
    init() {
        this.btns.forEach(btn => {
            let show = false;
            btn.addEventListener('click', () => {
                let sibling = btn.parentElement.nextElementSibling;
                sibling.classList.toggle('msg');
                sibling.style.marginTop = '15px';
            });
        });
    }
}