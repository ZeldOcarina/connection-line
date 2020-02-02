import axios from 'axios';

import { deleteBtn } from '../model/model';
import { displayFlash } from '../utils/display-alert';

const deletePost = () => {
	if (!deleteBtn) return;

	deleteBtn.addEventListener('click', async () => {
		try {
			const slug = deleteBtn.dataset.slug;
			const response = await axios({
				method: 'DELETE',
				url: `/api/v1/blog/${slug}`
			});

			if (response.status === 204) {
				displayFlash('success', 'Post rimosso con successo');

				setTimeout(() => {
					window.location.href = '/blog';
				}, 3000);
			} else throw new Error("Qualcosa è andato storto nell'eliminazione del post!");
		} catch (err) {
			displayFlash('error', err.message);
		}
	});
};

export default deletePost;
