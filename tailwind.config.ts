import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;