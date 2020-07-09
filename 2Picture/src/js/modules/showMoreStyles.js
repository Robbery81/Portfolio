import {getResourse} from '../services/requests';
const showMoreStyles = (triger, wrapper) => {
    let stylesContainer = document.querySelector(wrapper),
        stylesBtn = document.querySelector(triger);

    stylesBtn.addEventListener('click', function() {
        
        getResourse('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(error => console.log(error));    
        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
           
            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt>
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div>`;
            stylesContainer.append(card);
        });
    }
};

export default showMoreStyles;