import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        fern: {
          '50': '#f0fdf4',
          '100': '#dbfde6',
          '200': '#baf8cf',
          '300': '#84f1aa',
          '400': '#48e07d',
          '500': '#1db954',
          '600': '#14a547',
          '700': '#13823b',
          '800': '#156633',
          '900': '#13542c',
          '950': '#042f15',
        },
      },
    },
  },
  plugins: [],
}
export default config
