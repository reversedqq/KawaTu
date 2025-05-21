const LanguageManager = {
	current: 'pl',
	translations: {},
	fallback: {},
	languages: [],

	async init(defaultLang = 'pl') {
		this.current = localStorage.getItem('language') || defaultLang;
		this.languages = await this.loadLanguages();

		this.fallback = await this.fetchJSON('pl');
		if (this.current !== 'pl') {
			this.translations = await this.fetchJSON(this.current);
		}

		await this.translatePage();
		this.renderLanguageSelector();
	},

	async loadLanguages() {
		try {
			const res = await fetch('/data/lang/languages.json');
			return await res.json();
		} catch (e) {
			console.warn('languages.json not found or malformed');
			return [{ code: 'pl', name: 'Polski' }];
		}
	},

	async fetchJSON(lang) {
		try {
			const res = await fetch(`/data/lang/translations/${lang}.json`);
			return await res.json();
		} catch (e) {
			console.warn(`Failed to load ${lang}.json`);
			return {};
		}
	},

	translate(key) {
		return this.translations[key] || this.fallback[key] || key;
	},

	async translatePage() {
		document.querySelectorAll('[data-i18n]').forEach(el => {
			const key = el.dataset.i18n;
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				el.placeholder = this.translate(key);
			} else {
				el.textContent = this.translate(key);
			}
		});
	},

	renderLanguageSelector() {
		const container = document.querySelector('[data-lang-select]');
		if (!container) return;

		const options = this.languages.map(lang => ({
			name: lang.code,
			value: lang.code
		}));

		const defaultOption = {
			name: this.languages.find(lang => lang.code === this.current)?.code,
			value: this.languages.find(lang => lang.code === this.current)?.code
		};

		const select = new BreeziumSelect(
			options,
			async (langCode) => {
				localStorage.setItem('language', langCode);
				this.current = langCode;
				this.translations = langCode === 'pl' ? {} : await this.fetchJSON(langCode);
				await this.translatePage();
			},
			defaultOption
		);

		select.render(container);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	LanguageManager.init();
});