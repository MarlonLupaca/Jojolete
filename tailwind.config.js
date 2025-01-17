/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: '#202634',     
        secundario: '#293042',
        terceario: '#3F83ED',
        cuarto: '#ED583F',
        quito: '#FFA500',    
        textoClaro: '#EFF3F5',
        textoGris:'#adb5bd'   
      }
    },
  },
  plugins: [],
}
