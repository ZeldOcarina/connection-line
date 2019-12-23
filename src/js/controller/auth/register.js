import axios from 'axios';

import { signupForm } from '../../model/model';

function register() {
	const formParams = [ 'name', 'email', 'password', 'passwordConfirm' ];
	if (signupForm)
		signupForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const params = [];
			formParams.map((param) => {
				params.push(document.querySelector(`input[name="${param}"]`).value);
			}).value;
            
            const [ name, email, password, passwordConfirm] = params;

            axios.post('/signup')
			//const fields = document.querySelectorAll('input');
		});
}

export default register;
