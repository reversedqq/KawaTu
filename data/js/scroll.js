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