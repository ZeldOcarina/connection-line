import axios from 'axios';
import Cookies from 'js-cookie';

import { displayFlash } from '../../utils/display-alert';
import { logoutBtn } from '../../model/model';

const logoutFunction = async () => {
	try {
		const res = await axios({
			method: 'GET',
			url: '/logout'
		});

		if (res.data.status === 'success') location.reload(true);
	} catch (err) {
		console.dir(err);
		displayFlash('error', err.message);
	}
};

const logout = () => {
	if (logoutBtn) logoutBtn.addEventListener('click', logoutFunction);
};

export default logout;
