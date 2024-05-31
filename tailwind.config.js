import colors from 'tailwindcss/colors';

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
        background: {
          dark: colors.gray[900],
          light: colors.white,
        },
        primary: {
          dark: colors.gray[100],
          light: colors.gray[900],
        },
        secondary: {
          dark: colors.gray[400],
          light: colors.gray[700],
        },
        link: {
          dark: {
            normal: colors.purple[400],
            hover: colors.purple[300],
            active: colors.purple[500],
          },
          light: {
            normal: colors.purple[600],
            hover: colors.purple[500],
            active: colors.purple[700],
          },
        },
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
        code: ['Fira Code', 'monospace', 'Inconsolata'],
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
