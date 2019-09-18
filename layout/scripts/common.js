console.log("I'm Shawarma");

// Scroll on page

class ScrollOnPage {
    constructor() {
        this.init();
        this.resize();
    }

    scrollToElement(element) {
        const body = $('body');
        body.animate({ scrollTop: element }, 400);
        return false;
    }

    init() {
        const menuLink1 = $('.nav__link--products');
        const menuLink2 = $('.nav__link--ceo');
        const menuLink3 = $('.nav__link--promotions');
        const menuLink4 = $('.nav__link--location');

        const scrollToProducts = $('.products__title').offset().top;
        const scrollToCeo = $('.ceo__title').offset().top - 50 + 'px';
        const scrollToPromotions = $('.promotions__title').offset().top;
        const scrollToLocation = $('.map__title').offset().top;

        menuLink1.click(() => {
            this.scrollToElement(scrollToProducts);
        })

        menuLink2.click(() => {
            this.scrollToElement(scrollToCeo);
        })

        menuLink3.click(() => {
            this.scrollToElement(scrollToPromotions);
        })

        menuLink4.click(() => {
            this.scrollToElement(scrollToLocation);
        })
    }

    resize() {
        $(window).resize(() => {
            this.init();
        })
    }
}

const scrollOnPage = new ScrollOnPage();

// Slider

class Slider {
    constructor(){
        this.animation = false;
        this.slideIndex = 0;
        this.sliderList = document.querySelector('.slider__list');
        this.sliderItem = document.querySelectorAll('.slide-item');
        this.translatePosition = -(100 / (this.sliderItem.length + 2)) + "%";
        this.translatePositionLast = - this.sliderItem.length * (100 / (this.sliderItem.length + 2)) + "%";

        this.addSlidesForLoop();
        this.addHandlers();
    }

    addSlidesForLoop() {
        const children = this.sliderList.children;
        const cloneElementFirst = children[0].cloneNode(true);
        const cloneElementLast = children[this.sliderItem.length - 1].cloneNode(true);
        
        this.sliderList.insertBefore(cloneElementLast, children[0]);
        this.sliderList.appendChild(cloneElementFirst);
        this.sliderList.style.width = (this.sliderItem.length + 2) * 100 + "%";

        this.addTransformSlider();
    }

    addTransformSlider() {
        this.sliderList.style.transform = "translateX(" + this.translatePosition + ")";
    }

    addAnimationSlider() {
        this.sliderList.classList.add("transition");
    }

    removeAnimationSlider() {
        this.sliderList.classList.remove("transition");
    }

    calcWidthSlider() {
        this.sliderList.style.width = (this.sliderItem.length + 2) * 100 + "%";
    }

    translateScroll() {
        const translateScroll = (-(this.slideIndex + 1) * (100 / (this.sliderItem.length + 2))) + "%";
        this.sliderList.style.transform = "translateX(" + translateScroll + ")";
    }

    switchHandler() {
        setTimeout(() => {
            this.animation = false;
        }, 1000)
    }

    scrollToNext() {
        if (this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex++;

        this.addAnimationSlider();

        if (this.slideIndex > this.sliderItem.length - 1) {
            setTimeout(()=> {
                this.removeAnimationSlider();
                this.calcWidthSlider();
                this.slideIndex = 0;
                this.addTransformSlider();
                this.animation = false;
            }, 1000)
            
            this.translateScroll();

        } else {
            this.translateScroll();
            this.switchHandler();
        }
    }

    scrollToPrev() {
        if(this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex--;

        this.addAnimationSlider();

        if (this.slideIndex < 0) {
            setTimeout(()=> {
                this.removeAnimationSlider();
                this.calcWidthSlider();
                this.slideIndex = this.sliderItem.length - 1;
                this.sliderList.style.transform = "translateX(" + this.translatePositionLast + ")";
                this.animation = false;
            }, 1000)

            this.translateScroll();

        } else {
            this.translateScroll();
            this.switchHandler();
        }
    }

    addHandlers() {
        const slidePrev = document.querySelector('.controls__arrow--prev');
        const slideNext = document.querySelector('.controls__arrow--next');

        slidePrev.addEventListener('click', ()=> {
            slidePrev.classList.add('active');
            slideNext.classList.remove('active');

            this.scrollToPrev();
        })

        slideNext.addEventListener('click', ()=> {
            slidePrev.classList.remove('active');
            slideNext.classList.add('active');

            this.scrollToNext();
        })
    }
}

const slider = new Slider();

// Menu

class Menu {
    constructor() {
        this.init();
    }

    toggleMenu() {
        const menu = document.querySelector('.menu-mobile');
        menu.classList.toggle('active');

        this.calcHeight(menu);
    }

    calcHeight(menu) {
        const navHeight = document.querySelector('.menu-mobile__nav').offsetHeight;
        const contactsHeight = document.querySelector('.header-contacts--mobile').offsetHeight;
        const height = navHeight + contactsHeight + 'px';

        if (window.innerWidth > 767) {
            menu.style.height = 0;
        } else {
            if (menu.classList.contains('active')) {
                menu.style.height = height;
            } else {
                menu.style.height = 0;
            }
        }
    }

    toggleButton(button) {
        button.classList.toggle('button-menu--closed');
    }

    init() {
        const buttonMenu = document.querySelector('.button-menu');
        const menu = document.querySelector('.menu-mobile');

        buttonMenu.addEventListener('click', ()=> {
            this.toggleButton(buttonMenu);
            this.toggleMenu();
        })

        window.addEventListener('resize', ()=> {
            this.calcHeight(menu);
        })
    }
}

const menu = new Menu();

// Promotion slider

class PromotionSlider {
    constructor() {
        this.animation = false;
        this.slideIndex = 0;
        this.sliderList = document.querySelector('.promotions__list');
        this.sliderItem = document.querySelectorAll('.promotion');
        this.translatePosition = -(100 / (this.sliderItem.length + 2)) + "%";
        this.translatePositionLast = - this.sliderItem.length * (100 / (this.sliderItem.length + 2)) + "%";

        this.addSlidesForLoop();
        this.addHandlers();
    }

    addSlidesForLoop() {
        const children = this.sliderList.children;
        const cloneElementFirst = children[0].cloneNode(true);
        const cloneElementLast = children[this.sliderItem.length - 1].cloneNode(true);

        this.sliderList.insertBefore(cloneElementLast, children[0]);
        this.sliderList.appendChild(cloneElementFirst);
        this.sliderList.style.width = (this.sliderItem.length + 2) * 100 + "%";

        this.addTransformSlider();
    }

    addTransformSlider() {
        this.sliderList.style.transform = "translateX(" + this.translatePosition + ")";
    }

    addAnimationSlider() {
        this.sliderList.classList.add("transition");
    }

    removeAnimationSlider() {
        this.sliderList.classList.remove("transition");
    }

    calcWidthSlider() {
        this.sliderList.style.width = (this.sliderItem.length + 2) * 100 + "%";
    }

    translateScroll() {
        const translateScroll = (-(this.slideIndex + 1) * (100 / (this.sliderItem.length + 2))) + "%";
        this.sliderList.style.transform = "translateX(" + translateScroll + ")";
    }

    switchHandler() {
        setTimeout(() => {
            this.animation = false;
        }, 1000)
    }

    scrollToNext() {
        if (this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex++;

        this.addAnimationSlider();

        if (this.slideIndex > this.sliderItem.length - 1) {
            setTimeout(() => {
                this.removeAnimationSlider();
                this.calcWidthSlider();
                this.slideIndex = 0;
                this.addTransformSlider();
                this.animation = false;
            }, 1000)

            this.translateScroll();

        } else {
            this.translateScroll();
            this.switchHandler();
        }
    }

    scrollToPrev() {
        if (this.animation) {
            return;
        }

        this.animation = true;
        this.slideIndex--;

        this.addAnimationSlider();

        if (this.slideIndex < 0) {
            setTimeout(() => {
                this.removeAnimationSlider();
                this.calcWidthSlider();
                this.slideIndex = this.sliderItem.length - 1;
                this.sliderList.style.transform = "translateX(" + this.translatePositionLast + ")";
                this.animation = false;
            }, 1000)

            this.translateScroll();

        } else {
            this.translateScroll();
            this.switchHandler();
        }
    }

    addHandlers() {
        const slidePrev = document.querySelector('.controls__arrow--promotion-prev');
        const slideNext = document.querySelector('.controls__arrow--promotion-next');

        slidePrev.addEventListener('click', () => {
            this.scrollToPrev();
        })

        slideNext.addEventListener('click', () => {
            slidePrev.classList.remove('active');
            slideNext.classList.add('active');

            this.scrollToNext();
        })
    }
}

const promotionSlider = new PromotionSlider

