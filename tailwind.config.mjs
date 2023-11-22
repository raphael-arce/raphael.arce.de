/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				xs: "450px",
				"2xs": "420px"
			},},
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography'),
	],

	daisyui: {
		darkTheme: "light",
	}
}
