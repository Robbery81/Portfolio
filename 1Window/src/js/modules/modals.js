function modals() {
    function bindModal(trigerSelector, modalSelector, closeSelector, closeClickOverlay = true){

        let triger = document.querySelectorAll(trigerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]'),
        scroll = calcScroll();

        windows.forEach(item => item.style.display = 'none');

        triger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
            
               modal.style.display = 'block';
               document.body.classList.add('modal-open');
               document.body.style.marginRight = `${scroll}px`;
               //document.body.style.overflow = 'hidden';
               //clearTimeout(id);
    
            });
        });

        close.addEventListener('click', (e) => {
            windows.forEach(item => item.style.display = 'none');

            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
            //document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                
                windows.forEach(item => item.style.display = 'none');
    
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
              //document.body.style.overflow = '';
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
    
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close'); 
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    //let id = showModalByTime('.popup', 60000);
    

    function showModalByTime(selector, time){
        let id = setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.classList.add('modal-open');
        }, time);
        return id;
    }
}

export default modals;