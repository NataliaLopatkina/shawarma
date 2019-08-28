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

class Popup {
    constructor() {
        this.init();
    }

    togglePopup() {
        const popup = document.querySelector('.popup-order');
        popup.classList.toggle('is-active');

        const page = document.querySelector('.page');
        page.classList.toggle('popup-is-open');
    }

    init() {
        const buttons = document.querySelectorAll('.product__order');
        buttons.forEach((item)=> {
            item.addEventListener('click', ()=> {
                this.togglePopup();
            })
        })

        document.addEventListener('click', ()=> {
            const popup = document.querySelector('.popup-order');
            const popupActive = popup.classList.contains('is-active');
            const target = event.target;
            const popupTarget = popup.contains(target);
            const targetButtonOrder = popup.querySelector('.popup-order__button');

            if (popupTarget === true && popupActive && target != targetButtonOrder) {
                this.togglePopup();
            }
        })
    }
}

let popup = new Popup();
