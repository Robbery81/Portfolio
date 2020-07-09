import {getResourse} from '../services/requests';

const calc = (form, sizeSel, materialSel, optionSel, promoSel, divSel) => {
    let formWrapper = document.querySelector(form),
        size = document.querySelector(sizeSel),
        material = document.querySelector(materialSel),
        option = document.querySelector(optionSel),
        promocode = document.querySelector(promoSel),
        resultBlock = document.querySelector(divSel);

        let sum = 0;
        
        function calcFunction() {
            sum = Math.round((+size.value) * (+material.value) + (+option.value));
            if (size.value == "" || material.value == "") {
                resultBlock.innerHTML = `Для расчета нужно выбрать размер картины и материал картины`;
            } else if (promocode.value === 'IWANTPOPART') {
                resultBlock.innerHTML = Math.round(sum * 0.7); 
            } else {
                resultBlock.innerHTML = Math.round(sum);
            }
        }

        size.addEventListener('change', calcFunction);
        material.addEventListener('change', calcFunction);
        option.addEventListener('change', calcFunction);
        promocode.addEventListener('input', calcFunction);

};

export default calc;