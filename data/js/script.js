document.addEventListener('DOMContentLoaded', () => {
	const logo = document.querySelector('.logo');
	if (logo) {
		logo.addEventListener('click', () => {
			window.location.href = '/';
		});
	}
});