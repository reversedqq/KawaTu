document.querySelectorAll('.navigation__link').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetSection = this.getAttribute('data-section');
		const target = document.querySelector(`.section[data-section="${targetSection}"]`);

		if (target) {
			const headerOffset = document.querySelector('.header').offsetHeight;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	});
});

document.querySelector('.contacts-button')?.addEventListener('click', function (e) {
	e.preventDefault();

	const target = document.querySelector('.section[data-section="contacts"]');
	if (!target) return;

	const header = document.querySelector('.header');
	const headerOffset = header ? header.offsetHeight : 0;
	const elementPosition = target.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
});