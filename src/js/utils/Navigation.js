import $ from 'jquery';

const {
	heroLink,
	countersLink,
	storyLink,
	settoriLink,
	testimonialsLink,
	ctaLink,
	toggler
} = require('../model/model');

/************************
 * NAVIGATION MENU LOGIC
 ***********************/

const navigationHandler = () => {
	heroLink.on('click', toggleNav);
	countersLink.on('click', toggleNav);
	storyLink.on('click', toggleNav);
	settoriLink.on('click', toggleNav);
	testimonialsLink.on('click', toggleNav);
	ctaLink.on('click', toggleNav);

	function toggleNav() {
		toggler[0].checked = false;
	}
};

export default navigationHandler;
