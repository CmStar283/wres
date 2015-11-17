/**
 * Copyright 2015 Cm_Star. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require('fs');
var path = require('path');
var jade = require('jade');
var yaml = require('js-yaml');
var CleanCSS = require('clean-css');

var DEFAULT_OPTS = {
  density: 'comfortable',
  pretty: false
}

module.exports.render = function(template, theme, info, opts) {
  // Load default template and theme
  if (!template)
    template = fs.readFileSync(path.resolve(__dirname, '../formats/wf1.jade'), 'utf8');
  if (!theme)
    theme = fs.readFileSync(path.resolve(__dirname, '../themes/lines.css'), 'utf8');

  if (typeof(info) == 'string') {
    info = yaml.safeLoad(info);
    if (typeof(info) != 'object') { // Ensure valid resume information
      throw 'Could not parse the given resume information!';
    }
  }

  // Preserve new line characters through Jade
  info = JSON.parse(JSON.stringify(info).replace(/\\n/g, '\\\\n'));

  // Load default options, then add user options
  info.__opts = DEFAULT_OPTS;
  for (opt in opts) {
    info.__opts[opt] = opts[opt];
  }

  // Include theme in desired format
  info.__theme = opts.pretty ? theme : new CleanCSS().minify(theme).styles;

  // Render Jade template and convert new line characters to break tags
  return jade.render(template, info).replace(/\\n/g, '<br>');
}
