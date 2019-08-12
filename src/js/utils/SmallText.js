import $ from 'jquery';
import lastURLWord from './LastURLWord';

const smallText = () => {
	if (lastURLWord() === 'de') {
		$('#btn-link')[0].innerHTML = 'Fordern Sie sofort einen <br>Kostenvoranschlag an!';
		$('.form__checkbox-label--privacy, .form__checkbox-label--newsletter').addClass('small-text');
	}
};

export default smallText;
