import axios from 'axios';

import { signupForm } from '../../model/model';
import { displayFlash } from '../../utils/display-alert';

function register() {
	if (signupForm) {
		const formContent = {};

		signupForm.addEventListener('input', (e) => {
			let { name, value } = e.target;
			formContent[name] = value;
		});

		signupForm.addEventListener('submit', async (e) => {
			try {
				e.preventDefault();

				if (window.location.pathname === '/register') {
					const { name, email, password, passwordConfirm } = formContent;

					if (password !== passwordConfirm)
						return displayFlash('error', 'La password e la conferma password non coincidono');

					const response = await axios.post('/api/v1/users/signup', {
						name,
						email,
						password,
						passwordConfirm
					});
					if (response.status == 201) {
						displayFlash('success', 'Registrazione Avvenuta con Successo');
						setTimeout(() => {
							window.location.href = '/blog';
						}, 3000);
					}
				} else {
					const { email, password } = formContent;

					const response = await axios.post('/api/v1/users/login', {
						email,
						password
					});

					console.log(response);
					if (response.status === 200) displayFlash('success', 'Login avvenuto con successo');
					else throw new Error(response);

					window.location.href = '/blog';
				}
			} catch (err) {
				console.dir(err);
				if (err.response.data.message.startsWith('E11000'))
					err.response.data.message = 'Utente già registrato!';
				if (err.response.data.message.startsWith('User validation failed: password: Path `password`'))
					err.response.data.message = 'La password deve consistere di almeno otto caratteri.';
				displayFlash('error', err.response.data.message);
				console.log(err.response);
			}
		});
	}
}

export default register;
