console.log("I'm Shawarma");

// Slider

if (document.querySelectorAll(".controls__arrow").length > 0) {

    var animation = false;
    var sliderList = document.querySelector(".slider__list");
    var sliderItem = document.querySelectorAll(".slide-item");
    var slidePrev = document.querySelector(".controls__arrow--prev");
    var slideNext = document.querySelector(".controls__arrow--next");
    var slideIndex = 0;
    var children = sliderList.children;
    var cloneElementFirst = children[0].cloneNode(true);
    var cloneElementLast = children[sliderItem.length - 1].cloneNode(true);

    slidePrev.onclick = scrollToPrev;
    slideNext.onclick = scrollToNext;
    sliderList.style.width = sliderItem.length * 100 + "%";
    sliderList.insertBefore(cloneElementLast, children[0]);
    sliderList.appendChild(cloneElementFirst);
    sliderList.style.width = (sliderItem.length + 2) * 100 + "%";

    var translatePosition = -(100 / (sliderItem.length + 2)) + "%";

    sliderList.style.transform = "translateX(" + translatePosition + ")";

    function scrollToNext() {
        if (animation) {
            return;
        }

        animation = true;

        slideNext.classList.add("active");
        slidePrev.classList.remove("active");

        slideIndex++;
        sliderList.classList.add("transition");

        if (slideIndex > sliderItem.length - 1) {
            setTimeout(function () {
                sliderList.classList.remove("transition");
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%";
                slideIndex = 0;
                sliderList.style.transform = "translateX(" + translatePosition + ")";
                animation = false;
            }, 1000)

            var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
            sliderList.style.transform = "translateX(" + translateScroll + ")";
        }

        else {
            var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
            sliderList.style.transform = "translateX(" + translateScroll + ")";

            setTimeout(function () {
                animation = false;
            }, 1000)
        }
    }

    // setInterval(function() {
    //     scrollToNext();
    // }, 3500)

    function scrollToPrev() {
        if (animation) {
            return;
        }
        animation = true;

        slidePrev.classList.add("active");
        slideNext.classList.remove("active");

        slideIndex--;
        sliderList.classList.add("transition");

        if (slideIndex < 0) {
            setTimeout(function () {
                sliderList.classList.remove("transition");
                sliderList.style.width = (sliderItem.length + 2) * 100 + "%";
                slideIndex = sliderItem.length - 1;
                var translatePositionLast = -sliderItem.length * (100 / (sliderItem.length + 2)) + "%";
                sliderList.style.transform = "translateX(" + translatePositionLast + ")";
                animation = false;
            }, 1000)

            var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
            sliderList.style.transform = "translateX(" + translateScroll + ")";
        }

        else {
            var translateScroll = (-(slideIndex + 1) * (100 / (sliderItem.length + 2))) + "%";
            sliderList.style.transform = "translateX(" + translateScroll + ")";

            setTimeout (function () {
                animation = false;
            }, 1000)
        }
    }
}

// Popups

class Popup {
    constructor() {
        this.init();
    }

    openPopup(popup) {
        this.popup.classList.add('is-active');

        const page = document.querySelector('.page');
        page.classList.add('popup-is-open');
    }

    closePopup(popup) {
        this.popup.classList.remove('is-active');

        const page = document.querySelector('.page');
        page.classList.remove('popup-is-open');
    }

    init() {
        const buttons = document.querySelectorAll('.product__order');
        buttons.forEach((item)=> {
            item.addEventListener('click', ()=> {
                this.popup = document.querySelector('.popup-order');
                this.openPopup(this.popup)
            })
        })

        const buttonOrder = document.querySelector('.popup-order__button');
        buttonOrder.addEventListener('click', ()=> {
            this.popup = document.querySelector('.popup-payment');
            this.openPopup(this.popup);
        })

        const buttonRemoveOrder = document.querySelector('.order__remove-button');
        buttonRemoveOrder.addEventListener('click', ()=> {
            this.popup = document.querySelector('.popup-payment');
            this.closePopup(this.popup);
        })

        document.addEventListener('click', ()=> {
            const popups = document.querySelectorAll('.popup');
            popups.forEach((item)=> {
                const popupActive = item.classList.contains('is-active');
                const target = event.target;
                const popupTarget = item.contains(target);
                const popupContentTarget = item.querySelector('.popup__content').contains(target);

                if (popupTarget === true && popupActive && popupContentTarget === false) {
                    this.closePopup(item);
                }
            })
        })
    }
}

const popup = new Popup();

// Menu

class Menu {
    constructor(){
        this.handlerClick();
    }

    // Добавление класса меню
    // Изменение высоты блока
    // Нажатие на кнопку
    // Ресайз

    toggleButtonMenu(buttonMenu) {
        if (buttonMenu.classList.contains('button-menu--closed')) {
            buttonMenu.classList.remove('button-menu--closed');
        } else {
            buttonMenu.classList.add('button-menu--closed');
        }
    }

    toggleNav(nav) {
        const navMenuHeight = document.querySelector('.menu-mobile');
        const headerContactsHeight = document.querySelector('.header-contacts--mobile');

        if(nav.classList.contains('active')) {
            nav.classList.remove('active');
            nav.style.height = '0px';
        } else {
            nav.classList.add('active');
            nav.style.height = navMenuHeight + headerContactsHeight + 'px';
        }
    }

    // calcHeightMenu (navMenu, headerContacts) {
    //     const navHeight = navMenu.offsetHeight;
    //     const headerContactsHeight = headerContacts.offsetHeight;
    // }

    handlerClick() {
        const buttonMenu = document.querySelector('.button-menu');
        const nav = document.querySelector('.menu-mobile');
        

        buttonMenu.addEventListener('click', ()=> {
            this.toggleButtonMenu(buttonMenu);
            this.toggleNav(nav);
        })
    }
}

const menu = new Menu();
