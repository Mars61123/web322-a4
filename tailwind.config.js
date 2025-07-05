/*
********************************************************************************
*  WEB322 – Assignment 04
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  Name: Marsela Gjeka    Student ID: 153019237  Date: 07/04/2025
*
********************************************************************************/

/** 
@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './views/partials/**/*.ejs',
    './public/**/*.{js,css,html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'],
  },
};
