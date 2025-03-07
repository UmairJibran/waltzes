/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'neo': '4px 4px 0 0 #000',
                'neo-lg': '8px 8px 0 0 #000',
            },
        },
    },
    plugins: [],
} 