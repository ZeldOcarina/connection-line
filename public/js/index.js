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

    const heroSection = $('#section-hero');
    const countersSection = $('#counters');
    const storySection = $('#story');
    const settoriSection = $('#settori');
    const testimonialsSection = $('#testimonials');

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

    $(function () {
        $.scrollify({
            section: "#section-hero, #counters, #story, #settori, #testimonials",
            sectionName: false,
            interstitialSection: "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: true,
            standardScrollElements: "",
            setHeights: true,
            overflowScroll: true,
            updateHash: true,
            touchScroll: true,
            before: function () { },
            after: function (section) {
                if (section === 0) {
                    removeSidebarActive();
                    firstSection.addClass('progressive-sidebar__section--active');
                } else if (section === 1) {
                    removeSidebarActive();
                    secondSection.addClass('progressive-sidebar__section--active');
                } else if (section === 2) {
                    removeSidebarActive();
                    thirdSection.addClass('progressive-sidebar__section--active');
                } else if (section === 3) {
                    removeSidebarActive();
                    fourthSection.addClass('progressive-sidebar__section--active');
                } else if (section === 4) {
                    removeSidebarActive();
                    fifthSection.addClass('progressive-sidebar__section--active');
                }
            },
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
            autoplayTimeout: 3000,
            smartSpeed: 3000,
            slideTransition: 'linear',
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 5,
                    loop: true
                },
                600: {
                    items: 7,
                    loop: true
                },
                1000: {
                    items: 10,
                    loop: true
                }
            }
        });
    });
})();














