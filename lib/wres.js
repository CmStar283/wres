var fs = require('fs');
var path = require('path');
var jade = require('jade');
var CleanCSS = require('clean-css');

module.exports.render = function(template, style, info) {
  if (!template)
    template = fs.readFileSync(path.resolve(__dirname, '../template.jade'));
  if (!style)
    style = fs.readFileSync(path.resolve(__dirname, '../styles/lines.css'));
  info.__style = new CleanCSS().minify(style).styles;
  return jade.render(template, info);
}
