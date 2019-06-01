const heroSection = $('#section-hero');
const countersSection = $('#counters');
const storySection = $('#story');
const settoriSection = $('#settori');
const testimonialsSection = $('#testimonials');
const ctaSection = $('#cta');
const popupSection = $('#popup');

//POPUP DOM ELEMENTS
const popupOpener = $('.popup-opener');
const popupCloseButton = $('.popup__close');
const displayNone = 'd-none';
/************************
 * NAVIGATION MENU LOGIC
 ***********************/

(function navigationHandler() {
    const heroLink = $('.navigation__link--home');
    const countersLink = $('.navigation__link--counters');
    const storyLink = $('.navigation__link--story');
    const settoriLink = $('.navigation__link--settori');
    const testimonialsLink = $('.navigation__link--testimonials');
    const ctaLink = $('.navigation__link--cta');

    const toggler = $('#navi-toggle');

    heroLink.on('click', toggleNav);
    countersLink.on('click', toggleNav)
    storyLink.on('click', toggleNav)
    settoriLink.on('click', toggleNav)
    testimonialsLink.on('click', toggleNav)
    ctaLink.on('click', toggleNav)

    function toggleNav() { toggler[0].checked = false; }
})();

/*********************
 * COUNTER JAVASCRIPT
 *********************/

(function counter() {
    const counterNazioni = $('.counter__counter-nazioni');
    const counterNazioniText = $('.counter__nazioni-text')

    counterTraduttori();

    function counterTraduttori() {
        $('.counter__counter-traduttori').counterUp({
            time: 2000,
        });
        counterNazioni.counterUp({
            time: 2000,
            beginAt: 0,
        });
    }
})();

/*************
 * SCROLLIFY
 ************/
(function scrollify() {
    const sidebar = $('.progressive-sidebar__container');
    const firstSection = $('.progressive-sidebar__section-1');
    const secondSection = $('.progressive-sidebar__section-2');
    const thirdSection = $('.progressive-sidebar__section-3');
    const fourthSection = $('.progressive-sidebar__section-4');
    const fifthSection = $('.progressive-sidebar__section-5');
    const sixthSection = $('.progressive-sidebar__section-6');

    const activeSidebar = 'progressive-sidebar__section--active';

    function removeSidebarActive() {
        sidebar.children().removeClass('progressive-sidebar__section--active')
    }

    function scrollToSection(section) {
        $('html, body').animate({
            scrollTop: section.offset().top
        }, 1100);
    }

    firstSection.on('click', () => scrollToSection(heroSection));
    secondSection.on('click', () => scrollToSection(countersSection));
    thirdSection.on('click', () => scrollToSection(storySection));
    fourthSection.on('click', () => scrollToSection(settoriSection));
    fifthSection.on('click', () => scrollToSection(testimonialsSection));
    sixthSection.on('click', () => scrollToSection(ctaSection));

    $(function () {
        $.scrollify({
            section: "#section-hero, #counters, #story, #settori, #testimonials, #cta, #footer",
            sectionName: false,
            interstitialSection: "#footer",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: true,
            standardScrollElements: "#cta",
            setHeights: true,
            overflowScroll: true,
            updateHash: false,
            touchScroll: true,
            before: function (section) {
                if (section === 0) {
                    removeSidebarActive();
                    firstSection.addClass(activeSidebar);
                } else if (section === 1) {
                    removeSidebarActive();
                    secondSection.addClass(activeSidebar);
                } else if (section === 2) {
                    removeSidebarActive();
                    thirdSection.addClass(activeSidebar);
                } else if (section === 3) {
                    removeSidebarActive();
                    fourthSection.addClass(activeSidebar);
                } else if (section === 4) {
                    removeSidebarActive();
                    fifthSection.addClass(activeSidebar);
                } else if (section === 5) {
                    removeSidebarActive();
                    sixthSection.addClass(activeSidebar);
                }
            },
            after: function () { },
            afterResize: function () { },
            afterRender: function () { }
        });
    });
})();

/****************************
 * TESTIMONIALS OWL CAROUSEL
 ***************************/

(function testimonialCarousel() {
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 50,
            autoplay: true,
            autoplayTimeout: 2600,
            smartSpeed: 2600,
            slideTransition: 'linear',
            autoplayHoverPause: true,
            items: 3.5,
            responsive: {
                450: {
                    items: 4,
                    loop: true,
                },
                500: {
                    items: 5,
                    loop: true,
                },
                800: {
                    items: 6,
                    loop: true,
                },
                1000: {
                    items: 7,
                    loop: true,
                },
                1200: {
                    items: 8,
                    loop: true,
                },
                1500: {
                    items: 9,
                    loop: true,
                },
                1800: {
                    items: 10,
                    loop: true,
                },
                2000: {
                    items: 11,
                    loop: true,
                },
            },
        });
    });
})();

/***************
 * POPUP LOGIC
 **************/

(function popup() {

    popupOpener.on('click', openPopup);
    popupCloseButton.on('click', closePopup);

    // Variable to be used in mouseout function
    let popupState = false;
    let exitPopup = false;

    $('body').on('mouseout', (e) => {
        if (!e.relatedTarget && !e.toElement && !exitPopup) {
            openPopup();
            exitPopup = true;
        }
    });

    $(document).keyup((e) => {
        if (e.keyCode === 27 && popupState) closePopup();   // esc
    });

    $('.popup').on('click', (e) => {
        console.log(e.target);
    })


    function openPopup() {
        popupSection.removeClass(displayNone);
        popupState = true;
    }

    function closePopup() {
        popupSection.addClass(displayNone);
        popupState = false;
    }
})();














