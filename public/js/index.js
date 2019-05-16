/*********************
 * COUNTER JAVASCRIPT
 *********************/
(function () {
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

$(function () {
    $.scrollify({
        section: "#section-hero, #counters, #story, #settori",
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
        after: function () { },
        afterResize: function () { },
        afterRender: function () { }
    });
});











