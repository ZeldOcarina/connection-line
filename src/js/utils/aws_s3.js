const aws_s3 = () => {
	document.getElementById('contact-form').onsubmit = () => {
		const files = document.getElementById('file').files;
		const file = files[0];
		if (file == null) {
			return alert('No file selected.');
		}
		files.forEach((file) => {
			getSignedRequest(file);
		});
	};
};

function uploadFile(file, signedRequest, url) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', signedRequest);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('File successfully uploaded');
			} else {
				alert('Could not upload file.');
			}
		}
	};
	xhr.send(file);
}

function getSignedRequest(file) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				uploadFile(file, response.signedRequest, response.url);
			} else {
				alert('Could not get signed URL.');
			}
		}
	};
	xhr.send();
}

export default aws_s3;
