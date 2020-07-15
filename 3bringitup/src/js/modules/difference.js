export default class Difference {
    constructor(oldOfficer, newOfficer, itemClass) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItem = this.oldOfficer.querySelectorAll(itemClass);
            this.newItem = this.newOfficer.querySelectorAll(itemClass);
        }catch(e){}
    }

    bindTrigger(container, items) {
        let counter = 0;
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter < items.length - 2) {
                items[counter++].style.display = 'flex';
            } else {
                items[counter++].style.display = 'flex';
                items[counter++].remove();
            }
        });
    }

    hideCards(items) {
        items.forEach((item, i, arr) => {
            if (i < arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideCards(this.oldItem);
            this.hideCards(this.newItem);
            
            this.bindTrigger(this.oldOfficer, this.oldItem);
            this.bindTrigger(this.newOfficer, this.newItem);
        }catch(e){}
    }
}