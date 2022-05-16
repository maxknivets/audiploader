const Path = require("path");
const pwd = process.env.PWD;

const projectPaths = [
  Path.join(pwd, "../templates/**/*.html"),
  Path.join(pwd, "src/**/*.js"),
  Path.join(pwd, "src/*.js")
];

const contentPaths = [...projectPaths];
console.log(`tailwindcss will scan ${contentPaths}`);

module.exports = {
  content: contentPaths,
  theme: {
    extend: {},
  },
  plugins: [],
}
