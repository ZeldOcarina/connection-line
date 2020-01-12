import { flashMessage } from '../model/model';

export function displayFlash(type, message) {
	const removeMessage = () => {
		flashMessage.classList.remove('translate-x');
	};
	setTimeout(() => {
		removeMessage();
	}, 5000);
	if (flashMessage.classList.contains('flash-message--error')) flashMessage.classList.remove('flash-message--error');
	if (flashMessage.classList.contains('flash-message--success'))
		flashMessage.classList.remove('flash-message--success');
	if (flashMessage.classList.contains('translate-x')) removeMessage();
	flashMessage.classList.add(`flash-message--${type}`);
	flashMessage.classList.add('translate-x');
	flashMessage.innerHTML = `<div class="flash-message__inner-container">${message}<span class="flash-message__close-button">&times;</span></div>`;
	const span = document.querySelector('.flash-message__close-button');
	span.addEventListener('click', (e) => {
		removeMessage();
	});
}
