const changeImg = (block) => {
    const blockItems = document.querySelectorAll(block);
    blockItems.forEach(block => {
        block.addEventListener('mouseover', () => {
            showPaint(block);
        });
    });

    blockItems.forEach(block => {
        block.addEventListener('mouseout', () => {
            hidePaint(block);
        });
    });

    function showPaint(block) {
        let img = block.querySelector('img'),
            p = block.querySelectorAll('p:not(.sizes-hit)');

        p.forEach(item => {
            item.style.display = "none";
        });

        img.src = img.src.slice(0,-4) + '-1.png';
    }

    function hidePaint(block) {
        let img = block.querySelector('img'),
            p = block.querySelectorAll('p:not(.sizes-hit)');

        p.forEach(item => {
            item.style.display = "block";
        });

        img.src = img.src.slice(0,-6) + '.png';
    }
};

export default changeImg;