import $ from 'jquery';
import '../vendor/jquery.waypoints.min';
import '../vendor/jquery.counterup.min';

/*********************
 * COUNTER JAVASCRIPT
 *********************/

const counter = () => {
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
};

export default counter;