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

// Menu

class Menu {
}

const menu = new Menu();

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
        const scrollToCeo = $('.ceo__title').offset().top;
        const scrollToPromotions = $('.promotions__title').offset().top;
        const scrollToLocation = $('.map__title').offset().top;

        menuLink1.click(()=> {
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
        $(window).resize(()=> {
            this.init();
        })
    }
}

const scrollOnPage = new ScrollOnPage();
