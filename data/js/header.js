function getCurrentScrollY() {
	return window.scrollY || window.pageYOffset;
}

function getVisibleArea(element) {
	const rect = element.getBoundingClientRect();
	const windowHeight = window.innerHeight;

	const visibleTop = Math.max(rect.top, 0);
	const visibleBottom = Math.min(rect.bottom, windowHeight);

	return Math.max(visibleBottom - visibleTop, 0);
}

function appearanceOnScroll() {
	const scroll = getCurrentScrollY();
	document.documentElement.style.setProperty('--scrollY', `${scroll}px`);

	const header = document.querySelector('.header');
	const headerHeight = header.offsetHeight;

	if (scroll > headerHeight) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}

	let largestSection = null;
	let largestVisibleArea = 0;

	document.querySelectorAll('.section').forEach(section => {
		const visibleArea = getVisibleArea(section);

		if (visibleArea > largestVisibleArea) {
			largestVisibleArea = visibleArea;
			largestSection = section;
		}
	});

	if (largestSection) {
		const currentSection = largestSection.getAttribute('data-section');

		document.querySelectorAll('.navigation__link').forEach(link => {
			if (link.getAttribute('data-section') === currentSection) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}
}

window.addEventListener('scroll', appearanceOnScroll);
window.addEventListener('load', appearanceOnScroll);