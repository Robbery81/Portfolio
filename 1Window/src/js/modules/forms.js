import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loadind: 'Загрузка...',
        success: 'Спасибо, с вами свяжуться',
        failure: 'Чтото пошло нетак'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loadind;
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
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
           e.preventDefault();

           let statusMessage = document.createElement('div');
           statusMessage.classList.add('status');
           item.appendChild(statusMessage);

           const formData = new FormData(item);
           if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);    
                }
           }

           postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(res => {
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    document.querySelector('.popup_calc_end').style.display = 'none';
                    document.querySelector('.popup_calc_profile').style.display = 'none';
                    document.querySelector('.popup_calc').style.display = 'none';
                    state = {};
                    
            document.body.classList.remove('modal-open');
                }, 5000);
            });

           
        });
    });
};

export default forms;