import $ from 'jquery';

/************************
 * NAVIGATION MENU LOGIC
 ***********************/

const navigationHandler = () => {
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
};

export default navigationHandler;
