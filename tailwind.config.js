// GitHub Dark surfaces with Nord's cool grays (Polar Night / Snow Storm),
// keeping a purple accent between GitHub's purple and Nord's aurora.
const gray = {
  50: '#f6f8fa',
  100: '#eceff4',
  200: '#e5e9f0',
  300: '#d8dee9',
  400: '#9198a1',
  500: '#6e7781',
  600: '#4c566a',
  700: '#343a46',
  800: '#22272e',
  900: '#161b22',
  950: '#0d1117',
};

const purple = {
  50: '#f7f3ff',
  100: '#efe7ff',
  200: '#ddd0fb',
  300: '#cbb2ff',
  400: '#b392f0',
  500: '#a371f7',
  600: '#8250df',
  700: '#6639ba',
  800: '#512a97',
  900: '#3e1f79',
  950: '#2a1452',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ou 'media'
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.mdx', './mdx-components.tsx'],
  theme: {
    extend: {
      boxShadow: {
        lg: '0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        gray,
        slate: gray,
        purple,
        theme: {
          dark: purple[400],
          light: purple[600],
        },
        background: {
          dark: gray[900],
          light: '#ffffff',
        },
        primary: {
          dark: gray[100],
          light: '#2e3440',
        },
        // body text sits one step below headings so bold text stands out
        body: {
          dark: gray[300],
          light: '#3b4252',
        },
        secondary: {
          dark: gray[400],
          light: gray[600],
        },
        link: {
          dark: {
            normal: purple[400],
            hover: purple[300],
            active: purple[500],
          },
          light: {
            normal: purple[600],
            hover: purple[500],
            active: purple[700],
          },
        },
      },
      fontFamily: {
        // Titles share the code font, for a terminal look
        title: ['var(--font-code)', 'ui-monospace', 'monospace'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        code: ['var(--font-code)', 'ui-monospace', 'monospace'],
      },
      lineHeight: {
        base: '30px',
      },
      maxWidth: {
        '4xl': '62rem',
      },
    },
  },
  variants: {
    extend: {
      textDecoration: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
