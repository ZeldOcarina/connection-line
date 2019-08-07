import $ from 'jquery';
import { popupSection, popupOpener, popupCloseButton, displayNone } from './UiElements';
import Cookies from 'js-cookie';

/***************
 * POPUP LOGIC
 **************/

const popup = () => {
	const page = window.location.pathname.match(/\/([^\/]+)\/?$/)[1];
	// Variable to be used in mouseout function
	let popupState = false;
	let exitPopup = Cookies.get('modalOpened');

	popupOpener.on('click', openPopup);
	popupCloseButton.on('click', closePopup);

	if (page !== 'thankyou' && page !== 'privacy' && !exitPopup) {
		setTimeout(() => {
			if (!exitPopup) openPopup();
		}, 20000);

		$('body').on('mouseout', (e) => {
			if (!e.relatedTarget && !e.toElement && !exitPopup) {
				openPopup();
			}
		});

		$(document).keyup((e) => {
			if (e.keyCode === 27 && popupState) closePopup(); // esc
		});
	}

	function openPopup() {
		popupSection.removeClass(displayNone);
		popupState = true;
		if (!exitPopup) Cookies.set('modalOpened', 'true', { expires: 7 });
	}

	function closePopup() {
		popupSection.addClass(displayNone);
		popupState = false;
	}
};

export default popup;
