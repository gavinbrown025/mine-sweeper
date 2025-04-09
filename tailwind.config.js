/** @type {import('tailwindcss').Config} */

const gridRepeat = () =>
  Object.assign(
    {},
    ...Array.from({ length: 40 }).map((_, i) => ({
      [`ms${i + 5}`]: `repeat(${i + 5}, 1.5rem)`,
    }))
  );

const grid = gridRepeat();

const tw = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [{ pattern: /grid*/ }],
  theme: {
    extend: {
      gridTemplateColumns: gridRepeat(),
      gridTemplateRows: gridRepeat(),
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

export default tw;
