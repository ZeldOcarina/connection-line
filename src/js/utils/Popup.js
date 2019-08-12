import $ from 'jquery';
import { popupSection, popupOpener, popupCloseButton, displayNone } from './UiElements';
import Cookies from 'js-cookie';
import lastURLword from './LastURLWord';

/***************
 * POPUP LOGIC
 **************/

const popup = () => {
	const page = lastURLword();
	// Variable to be used in mouseout function
	let popupState = false;

	popupOpener.on('click', openPopup);
	popupCloseButton.on('click', closePopup);

	if (page !== 'thankyou' && page !== 'privacy' && !Cookies.get('modalOpened')) {
		setTimeout(() => {
			if (!Cookies.get('modalOpened')) openPopup();
		}, 20000);

		$('body').on('mouseout', (e) => {
			if (!e.relatedTarget && !e.toElement && !Cookies.get('modalOpened')) {
				openPopup();
			}
		});

		$(document).keyup((e) => {
			if (e.keyCode === 27 && popupState) closePopup(); // esc
		});

		$(document).click((e) => {
			if (!$(e.target).closest('.popup__content').length) {
				closePopup();
			}
		});
	}

	function openPopup() {
		popupSection.removeClass(displayNone);
		popupState = true;
		Cookies.set('modalOpened', 'true', { expires: 7 });
	}

	function closePopup() {
		popupSection.addClass(displayNone);
		popupState = false;
	}
};

export default popup;
