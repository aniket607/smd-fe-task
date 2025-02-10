import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      outline: {
        DEFAULT: '0',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            lineHeight: '1',
            p: {
              marginTop: '0rem',
              marginBottom: '0.125rem',
              lineHeight: '1',
            },
            ul: {
              marginTop: '0rem',
              marginBottom: '0rem',
              paddingLeft: '1rem',
              listStyleType: 'disc',
            },
            ol: {
              marginTop: '0rem',
              marginBottom: '0rem',
              paddingLeft: '1rem',
              listStyleType: 'decimal',
            },
            li: {
              marginTop: '0rem',
              marginBottom: '0rem',
              marginLeft: '1rem',
              lineHeight: '1.3',
            },
            'li::marker': {
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
