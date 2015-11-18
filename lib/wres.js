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

 'use strict';

var fs = require('fs');
var path = require('path');
var jade = require('jade');
var yaml = require('js-yaml');
var CleanCSS = require('clean-css');

var DEFAULT_OPTS = {
  density: 'comfy',
  pretty: false
}
var DEFAULT_FORMAT = path.resolve(__dirname, '../formats/wf1.jade');
var DEFAULT_THEME = path.resolve(__dirname, '../themes/lines.css');

module.exports.render = function(info, format, theme, opts) {
  // Load default format and theme
  if (!format)
    format = fs.readFileSync(DEFAULT_FORMAT, 'utf8');
  if (!theme)
    theme = fs.readFileSync(DEFAULT_THEME, 'utf8');

    // Load default options, then add user options
    info.__opts = DEFAULT_OPTS;
    for (opt in opts) {
      info.__opts[opt] = opts[opt];
    }

  // Parse resume info, if needed
  if (typeof(info) !== 'object')
    if (typeof(info) === 'string') {
      info = yaml.safeLoad(info);
      if (typeof(info) !== 'object') // Ensure resume info is parsed
        throw new Error('Could not parse the given resume information!');
    }

  // Preserve new line characters through Jade
  info = JSON.parse(JSON.stringify(info).replace(/\\n/g, '\\\\n'));

  // Load theme into info object
  info.__theme = info.__opts.pretty ? theme : new CleanCSS().minify(theme).styles;

  // Render Jade template, then convert new line characters to break tags
  return jade.render(format, info).replace(/\\n/g, '<br>');
}
