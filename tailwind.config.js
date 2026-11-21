/** Design tokens live here. Change a colour once, it changes everywhere. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f2319',      // deepest green, hero + footer
        forest: '#173528',   // headings on light
        cream: '#f3eee1',    // page background
        bone: '#faf7ef',     // card surface
        gold: '#a98a3d',     // rules, markers (use sparingly)
        goldl: '#d2b365',    // gold on dark
        rule: '#d8d1bd',     // hairlines on light
        mute: '#566057',     // secondary text on light
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
