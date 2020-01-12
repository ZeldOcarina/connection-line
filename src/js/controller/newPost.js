import axios from 'axios';

import { newPostForm, fileInput, fileInputLabel } from '../model/model';
import { displayFlash } from '../utils/display-alert';

const newPost = () => {
	if (window.location.pathname === '/blog/post') {
		const formContent = {};

		tinymce.init({
			selector: '.new-post__textarea',
			height: '50rem',
			init_instance_callback: function(editor) {
				editor.on('input', function(e) {
					formContent.content = tinymce.activeEditor.getContent();
				});
			}
		});

		newPostForm.addEventListener('input', (e) => {
			let { name, value } = e.target;
			formContent[name] = value;
		});

		fileInput.addEventListener('change', (e) => {
			const { files } = e.target;
			if (files.length > 0) fileInputLabel.textContent = files[0].name;
		});

		newPostForm.addEventListener('submit', async (e) => {
			try {
				e.preventDefault();
				//console.log(formContent);
				const form = new FormData();
				form.append('title', formContent.title);
				form.append('subtitle', formContent.subtitle);
				form.append('content', formContent.content);
				form.append('post-image', fileInput.files[0]);

				/*for (var [ key, value ] of form.entries()) {
					console.log(key, value);
				}*/

				const result = await axios({
					method: 'POST',
					url: '/api/v1/blog',
					data: form
				});

				console.log(result);

				if (result.status === 201) {
					displayFlash('success', 'Post creato con successo!');
					setTimeout(() => {
						window.location.pathname = `/blog/${result.data.data.post.slug}/`;
					}, 4000);
				}
			} catch (err) {
				let message = err.response.data.message;
				if (message.startsWith('E11000')) message = 'Sembra che ci sia già un post con questo titolo.';
				displayFlash('error', message);
				console.dir(err);
			}
		});
	}
};

export default newPost;
