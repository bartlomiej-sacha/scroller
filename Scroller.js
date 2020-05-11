class Scroller {
    constructor(rootSelector) {

        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');

        //optional
        /* const sectionsArr = Array.prototype.slice.call(this.sections); */

        const sectionsArr = [...this.sections];



        //optional
        /*  this.currentSectionIndex = sectionsArr.findIndex((element) => {
             return this.isScrolledIntoView(element);
         }) */

        const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);

        this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;
        //optional
        /*  this.currentSectionIndex = Math.max(currentSectionIndex, 0); */


        this.isThrottled = false;


        this.isScrolledIntoView(this.sections[0]);
    }

    isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVissible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVissible;
    }


    listenScroll = (event) => {

        if (this.isThrottled) {
            return;
        }
        this.isThrottled = true;


        setTimeout(() => {
            this.isThrottled = false;
        }, 1000);


        const direction = event.wheelDelta < 0 ? 1 : -1;


        this.scroll(direction);

    }



    scroll = (direction) => {



        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;


        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return;
        }

        this.currentSectionIndex = this.currentSectionIndex + direction;


        this.scrollToCurrentSection();

    }


    scrollToCurrentSection = () => {

        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }


}