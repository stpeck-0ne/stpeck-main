/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      nyanza: {
        default: '#E5FFDE'
      },
      gray: {
        default: '#BBCBCB'
      },
      pink: {
        default: '#9590A8'
      },
      violet: {
        default: '#634B66'
      },
      licorice: {
        default: '#18020C'
      }
    }
  },
  plugins: []
}
