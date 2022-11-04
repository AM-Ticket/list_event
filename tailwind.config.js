/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: `#FF731C`,
				base: '#F5F5FB',
				textDark: '#393939',
				textLight: `#969BAB`,
				border: `#C4C4C6`,
				neutral: {
					0: '#1F1F1F',
					25: '#8D8D8D',
					50: '#585858',
					60: '#e6e6e6',
				},
			},
		},
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		}
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
