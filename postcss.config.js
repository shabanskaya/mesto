
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // плагины к PostCSS
  plugins: [
    // autoprefixer
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};