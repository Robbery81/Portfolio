export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loadind: 'Загрузка...',
            success: 'Спасибо, с вами свяжуться',
            failure: 'Чтото пошло нетак',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        };
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }

    clearInputs (input) {
        input.forEach(item => {
            item.value = '';
        });
    }

    checkTextInputs(selector){
        const txtInputs = document.querySelectorAll(selector);
    
        txtInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @\.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {

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
            let matrix = '+1 (___) ___-____',
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
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(item => {
            item.addEventListener('input', createMask);
            item.addEventListener('focus', createMask);
            item.addEventListener('blur', createMask);
        });
    }

    init() {
        this.checkTextInputs('[name="email"]');
        this.initMask();

        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                margin-top: 15px;
                font-size:18px;
                color: grey;`;

                item.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;
                
                const formData = new FormData(item);
    
                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(res => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs(this.inputs);
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}