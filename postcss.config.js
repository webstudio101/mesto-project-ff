// postcss.config.js KN - 7sp
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
module.exports = {
  plugins: [autoprefixer, cssnano({ preset: "default" })],
};
