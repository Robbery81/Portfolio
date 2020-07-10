const accordion = (trigersSelector, contentSelector) => {
    const btn = document.querySelectorAll(trigersSelector),
          content = document.querySelectorAll(contentSelector);

    btn.forEach((h, i) => {
        h.addEventListener('click', () => {
            checkContent(i);
        });
    });

    content.forEach(c => {
        c.style.display = 'none';
        c.classList.add('animated', 'fadeInUp');
    });

    function showContent(countContent) {
        content[countContent].style.display = 'block';
        btn[countContent].classList.add('ui-accordion-header-active');
        btn[countContent].style.marginBottom = '20px';
        btn[countContent].style.cursor = 'pointer';
    }

    function hideContent(countContent) {
        content[countContent].style.display = 'none';
        btn[countContent].classList.remove('ui-accordion-header-active');
    }

    function checkContent(countContent) {
        if (content[countContent].style.display === 'none') {
            showContent(countContent);
        } else {
            hideContent(countContent);
        }
    }
};

export default accordion;