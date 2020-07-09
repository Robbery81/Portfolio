function modals() {
    let btnPressed = false;
    function bindModal(trigerSelector, modalSelector, closeSelector, destroy = false){

        let triger = document.querySelectorAll(trigerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();
        
        windows.forEach(item => {
            item.style.display = 'none';
            item.classList.add('animated', 'fadeIn');
        });

        triger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }
            
               modal.style.display = 'block';
               document.body.classList.add('modal-open');
               document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', (e) => {
            windows.forEach(item => item.style.display = 'none');

            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                
                windows.forEach(item => item.style.display = 'none');
    
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
            }
         });
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrolWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrolWidth;
    }
    
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true); 
    
    openByScroll('.fixed-gift');
    let id = showModalByTime('.popup-consultation', 60000);
    
    function openByScroll(selector) {
        window.addEventListener('scroll', function() {
            let pageYOffset = Math.ceil(window.pageYOffset + document.documentElement.clientHeight);
            let fullScrollHeight = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight);

            if (!btnPressed && (pageYOffset == fullScrollHeight) ) {
                document.querySelector(selector).click();
            }
          });
    }
    
    function showModalByTime(selector, time){
        let id = setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
               document.querySelector(selector).style.display = 'block';
               document.body.classList.add('modal-open');
               let scroll = calcScroll();
               document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
        return id;
    }
}

export default modals;