import axios from 'axios';

import { displayFlash } from './display-alert';

const meModifyBtn = document.querySelector('.me__btn-modify');
const meContainer = document.querySelector('.me');
const nameParagraph = document.querySelector('.me__name');
const emailParagraph = document.querySelector('.me__email');
const avatarImg = document.querySelector('.me__avatar');

function me() {
	if (window.location.pathname === '/user/me') {
		meModifyBtn.addEventListener('click', (e) => {
			const username = nameParagraph.textContent.split(':')[1].replace(' ', '');
			const email = emailParagraph.textContent.split(':')[1].replace(' ', '');
			const avatar = avatarImg.getAttribute('src');

			meContainer.innerHTML = `
            <h2 class="">Modifica i tuoi dati:</h2>
            <form class="new-post__form">
                <div class="new-post__input-container">
                    <label class="new-post__label" for="me-username" name="username" value="${username}">Nome</label>
                    <input class="new-post__text-input" type="text" name="username" value="${username}" id="me-username">
                </div>
                <div class="new-post__input-container">
                    <label class="new-post__label" for="me-email" name="username" value="${username}">Email</label>
                    <input class="new-post__text-input" type="email" name="email" value="${email}" id="me-email">
                </div>
                <figure>
                    <img class="me__avatar pointer" src="${avatar}" alt="avatar">
                    <figcaption class="me__avatar-caption pointer">Avatar - Clicca per modificare l'immagine</figcaption>
                </figure>
                <input class="me__file-input d-none" type="file" name="avatar" accept="image/*">
                <input type="submit" class="new-post__submit btn btn--primary" value="Salva Modifiche">
            `;

			const selectors = {
				form: document.querySelector('.new-post__form'),
				meFileInput: document.querySelector('.me__file-input'),
				meAvatar: document.querySelector('.me__avatar'),
				meCaption: document.querySelector('.me__avatar-caption'),
				submitInput: document.querySelector('.new-post__submit'),
				usernameInput: document.getElementById('me-username'),
				emailInput: document.getElementById('me-email')
			};

			const { meAvatar, meCaption, usernameInput, emailInput, meFileInput, form } = selectors;

			const arr = [ meAvatar, meCaption ];
			for (let element of arr)
				element.addEventListener('click', (e) => {
					meFileInput.click();
				});

			meFileInput.addEventListener('change', (e) => {
				const { files } = e.target;
				if (files.length > 0)
					meCaption.textContent = `"${files[0].name}" selezionato, clicca sotto per salvare`;
			});

			form.addEventListener('submit', async (e) => {
				try {
					e.preventDefault();
					const form = new FormData();
					form.append('name', usernameInput.value);
					form.append('email', emailInput.value);
					form.append('avatar', meFileInput.files[0]);

					const result = await axios({
						method: 'PATCH',
						url: '/user/me',
						data: form
					});

					if (result.status === 200) {
						displayFlash('success', 'Profilo aggiornato con successo');
						const { avatar, name, email } = result.data.data;
						usernameInput.value = name;
						emailInput.value = email;
						meAvatar.setAttribute('src', avatar);
						meCaption.textContent = `File salvato, clicca per modificare ancora.`;
					}
					console.log(result);
				} catch (err) {
					console.error(err);
					displayFlash('error', err.message);
				}
			});
		});
	}
}

export default me;
