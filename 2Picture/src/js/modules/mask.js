const mask = (select) => {

    function setCursorPosition(pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        if (val[0] != matrix[1]) {
            val = def;
        }

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        }); // a = every char on matrix

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            } 
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(select);

    inputs.forEach(item => {
        item.addEventListener('input', createMask);
        item.addEventListener('focus', createMask);
        item.addEventListener('blur', createMask);
    });
};

export default mask;