import $ from 'jquery';
import '../vendor/jquery.waypoints.min';
import 'owl.carousel';

/****************************
 * TESTIMONIALS OWL CAROUSEL
 ***************************/

const testimonialCarousel = () => {
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
};

export default testimonialCarousel;