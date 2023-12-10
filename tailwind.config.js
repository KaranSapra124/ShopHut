// /** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,cjs}"],
  theme: {
    
    extend: {
     animation:{
      'bounce':'bounce 1.5s normal',
      'ping':'ping 2s normal'
     }
    },
  },
  plugins: [],
}