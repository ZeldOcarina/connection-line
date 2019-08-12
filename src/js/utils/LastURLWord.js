const lastURLWord = () => {
	const currentURL = window.location.pathname;
	const splittedURL = currentURL.split('/');
	return splittedURL[splittedURL.length - 1];
};

export default lastURLWord;
