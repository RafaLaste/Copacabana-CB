/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Inter', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '5%',
                screens: {
                    sm: '90%',
                    md: '90%',
                    lg: '90%',
                    xl: '90%',
                },
            },
            maxWidth: {
                'small': '58rem',
                'medium': '77rem',
                'large': '104rem',
            },
            spacing: {
                '15': '3.75rem',
                '30': '7rem',
                '40': '9.375rem',
                '50': '12.5rem',
            },
            colors: {
                'primary': '#4E3629',
                'secondary': '#FFD532',
                'tertiary': '#FBFAF7',
            },
            keyframes: {
                'fade-out-down': {
                    '0%': { opacity: '1', transform: 'none' },
                    '100%': { opacity: '0', transform: 'translate3d(0, 100px,0)' },
                },
                'bg-up': {
                    '0%': { backgroundPosition: 'left 555px' },
                    '100%': { backgroundPosition: 'left 0' }
                }
            },
            animation: {
                'fade-out-down': 'fade-out-down 200ms linear',
                'bg-up': 'bg-up 30s linear infinite'
            },
        },
    },
    plugins: [
        function({ addComponents }) {
            addComponents({
                'p + p': {
                    marginTop: '1rem',
                },
                'strong, b': {
                    fontWeight: 'bold'
                }
            })
        }
    ],
}

