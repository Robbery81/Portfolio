//import checkNumInputs from './checkNumInputs';

const forms = () => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    //checkNumInputs('input[name="user_phone"]');

    const message = {
        loadind: 'Загрузка...',
        success: 'Спасибо, с вами свяжуться',
        failure: 'Чтото пошло нетак',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            item.previousElementSibling.textContent = decorateNameFile(item.files[0].name);
        });
    });

    function decorateNameFile(name) {
        let a = name.split('.');
        
        if (a[0].length >= 7) {
            a[0] = a[0].substr(0,7) + '..';
        }

        return a.join('.');
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
           e.preventDefault();

           let statusMessage = document.createElement('div');
           statusMessage.classList.add('status');
           item.parentNode.appendChild(statusMessage);

           item.classList.add('animated', 'fadeOutUp');
           setTimeout(() => item.style.display = 'none', 400);

           let statusImg = document.createElement('img');
           statusImg.setAttribute('src', message.spinner);
           statusImg.classList.add('animated', 'fadeInUp');
           statusMessage.appendChild(statusImg);

           let textMessage = document.createElement('div');
           textMessage.textContent = message.loading;
           statusMessage.appendChild(textMessage);
           

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

           postData(api, formData)
            .then(res => {
                console.log(res);
                statusImg.setAttribute('src', message.ok);
                textMessage.textContent = message.success;
            })
            .catch(res => {
                textMessage.textContent = message.failure;
                statusImg.setAttribute('src', message.fail);
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
                }, 5000);
            });
        });
    });
};

export default forms;