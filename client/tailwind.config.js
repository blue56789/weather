/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: 'var(--bg)',
        bgSecondary: 'var(--bg2)',
        shadow: 'var(--shadow)',
        txtPrimary: 'var(--text)',
        border: 'var(--border)'
      },
      dropShadow: {
        custom: 'var(--drop-shadow)'
      }
    },
  },
  plugins: [],
}

