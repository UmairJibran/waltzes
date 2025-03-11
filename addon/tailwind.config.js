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
            colors: {
                primary: {
                    text: '#1A1A1A',  // Very dark gray for primary text
                    heading: '#000000', // Pure black for headings
                },
                secondary: {
                    text: '#4A4A4A',  // Dark gray for secondary text
                    label: '#666666',  // Medium gray for labels
                },
                accent: {
                    success: '#22C55E', // Green for success states
                    warning: '#F59E0B', // Yellow for processing states
                    error: '#EF4444',   // Red for error states
                },
            },
        },
    },
    plugins: [],
} 