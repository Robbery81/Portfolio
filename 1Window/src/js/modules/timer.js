const timer = (id, deadline) => {
    

    function getTimeRamaining(endTime) {
        let t = endTime.getTime() - new Date().getTime(),
            sec = Math.floor((t / 1000) % 60),
            min = Math.floor((t / 1000 / 60) % 60),
            h = Math.floor((t / (1000 * 60 * 60)) % 24),
            d = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            total: t,
            d, h, min, sec
        };
    }
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            let t = getTimeRamaining(endTime);

            seconds.textContent = addZero(t.sec);
            minutes.textContent = addZero(t.min);
            hours.textContent = addZero(t.h);
            days.textContent = addZero(t.d);

            if (t.total <= 0) {
                seconds.textContent = '00';
                minutes.textContent = '00';
                hours.textContent = '00';
                days.textContent = '00';
                clearInterval(timeInterval);
            }
        }
        
    }

    function addZero(num) {
        return num <=9 ? '0' + num : num;
    }

    setClock(id, deadline);
};

export default timer;