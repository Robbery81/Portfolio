const images = () => {
    const imgPopup = document.createElement('div');
    let workSection = document.querySelector('.works'),
        bigImage = document.createElement('img');
    
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);
    

    imgPopup.style.cssText = `
        justify-content: center; 
        align-items: center; 
        display: none;`;
    bigImage.style.cssText = `
        max-height: 100%;
        max-width: 100%;`;

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;

            if (target && target.classList.contains('preview')) {
                imgPopup.style.display = 'flex';
                let path = target.parentNode.getAttribute('href');
                bigImage.setAttribute('src', path);
                document.body.style.overflow = 'hidden';
            }

            if (target && target.matches('div.popup') ) { //клик на подложку
                imgPopup.style.display = 'none';
                document.body.style.overflow = '';
            }
    });
};

export default images;