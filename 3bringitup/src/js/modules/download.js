export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.link = 'assets/img/fail.png';
    }

    downloadFile() {
        let pseudoLink = document.createElement('a');
        pseudoLink.setAttribute('href', this.link);
        pseudoLink.setAttribute('download', '');
        pseudoLink.style.display = 'none';

        document.body.appendChild(pseudoLink);
        
        pseudoLink.click();
        pseudoLink.remove();
    }

    init() {
        this.triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadFile();
            });
        });
    }
}