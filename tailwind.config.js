module.exports = {
	content: [
		'./src/html/**/*.{html,js}',
		'./src/js/**/*.{js}',
		'./node_modules/flowbite/**/*.js',
	],
	safelist: [
		"table-cell",
		"shadow-main",
	],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				'aeonik-md': 'var(--font-aeonik-md)',
				'aeonik-reg': 'var(--font-aeonik-reg)',
				'aeonik-bold': 'var(--font-aeonik-bold)',
			},
			colors: {
				purple: "var(--purple)",
				'purple-dark': "var(--purple-dark)",
				'purple-100': "var(--purple-100)",
				main: "var(--main)",
				gray: 'var(--gray)',
				'gray-100': 'var(--gray-100)',
				bgc: 'var(--bgc)',
				green: 'var(--green)',
				'green-100': 'var(--green-100)',
				yellow: 'var(--yellow)',
				'yellow-100': 'var(--yellow-100)',
				blue: 'var(--blue)',
				'blue-100': 'var(--blue-100)',
				coral: 'var(--coral)',
				'natural-white': 'var(--natural-white)',
				'grey-neutral': 'var(--grey-neutral)',
				'gray-light': 'var(--gray-light)',
			},
			borderRadius: {
				radius: 'var(--radius)',
			}
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
};
