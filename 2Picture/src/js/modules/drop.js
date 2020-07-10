import {postData} from '../services/requests';
const drop = () => {
    //drag&drop fuctionality
    //drag *
    //dragend *
    //dragenter - обьект над dropArea
    //dragexit *
    //dragleave - обьект за пределами dropArea
    //dragover - обьект зависает над dropArea (в межах)
    //dragstart *
    //drop - обьект вброшен в dropArea
    //* - спрацбовують на елементі який перетягується

    const fileInputs = document.querySelectorAll('[name="upload"]');

    console.log(fileInputs);

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefault, false);
        });
    });

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhighLight(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if(item.closest('.file_upload_fast')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        }else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
        
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
           input.files = e.dataTransfer.files;
           input.previousElementSibling.textContent = decorateNameFile(input.files[0].name);
           console.log("drop");
           if (input.closest('.file_upload_fast')) {
               console.log(input.files[0]);
               const formData = new FormData().append("img", input.files[0]);
             postData('assets/server.php', formData)
             .then(res => {
                console.log(res);
            })
            .catch(res => {
            })
            .finally(() => {
                clearInputs();
            });
           }
        });
    });

    function decorateNameFile(name) {
        let a = name.split('.');
        
        if (a[0].length >= 7) {
            a[0] = a[0].substr(0,7) + '..';
        }

        return a.join('.');
    }

    const clearInputs = () => {
        let upload = document.querySelectorAll('[name="upload"]');
        fileInputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };
};

export default drop;