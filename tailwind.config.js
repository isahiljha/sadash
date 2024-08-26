/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        'login-light': "url('/Images/img-bg.jpeg')",
        // 'login-light': "url('https://www.shutterstock.com/image-illustration/dream-big-4k-motivational-quotes-600nw-2326667861.jpg')",
        'login-dark': "url('https://t3.ftcdn.net/jpg/02/29/07/42/360_F_229074283_5HpNAac8t1a9q2hGcDkP94k0z2Nvcp0X.jpg')",
      },
      colors: {
        dark: "#09090b",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}