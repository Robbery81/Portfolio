const tabs = (headerSelector, tabSelector) => {
    const menu = document.querySelector(headerSelector),
          menuItem = document.querySelectorAll(`${headerSelector}>li`),
          content = document.querySelectorAll(tabSelector);
    let count = ['all', 'lovers', 'chef', 'girl', 'guy', 'grandmother', 'granddad'];

    menu.addEventListener('click', (e) => {
        const target = e.target;
        for (let i = 0; i < count.length; i++) {
            
            if (target.classList.contains(count[i])) {
                document.querySelector('.portfolio-no').style.display = 'none';
               
                hideContent();
                showContent(count[i]);

                menuItem.forEach(item => item.classList.remove('active'));
                menuItem[i].classList.add('active');
            }
        }
    });

    function hideContent() {
        content.forEach((item) => {
            item.parentNode.style.display = 'none';
            item.parentNode.classList.remove('animated', 'fadeIn');
        });
    }

    function showContent(className) {
        content.forEach((item) => {

            if (item.parentNode.classList.contains(className)) {
                item.parentNode.style.display = 'block';
                item.parentNode.classList.add('animated', 'fadeIn');

            } else if(className == 'grandmother' || className == 'granddad'){ //have not image
                document.querySelector('.portfolio-no').style.display = 'block';
            }
        });
    }
};

export default tabs;