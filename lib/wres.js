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
var FORMAT_DIR = path.resolve(__dirname, '../formats');
var THEME_DIR = path.resolve(__dirname, '../themes');
var DEFAULT_FORMAT = path.resolve(FORMAT_DIR, 'wf1.jade');
var DEFAULT_THEME = path.resolve(THEME_DIR, 'plain.css');

module.exports.render = function(resume, format, theme, opts) {
  // Load resume
  if (!resume)
    throw new Error('No resume information given!');
  try {
    fs.accessSync(resume, fs.F_OK | fs.R_OK);
    resume = fs.readFileSync(resume, 'utf8');
  } catch (err) {
  } finally {
    resume = yaml.safeLoad(resume);
    if (typeof(resume) !== 'object') // Ensure resume info is parsed
      throw new Error('Could not parse the given resume information!');
  }

  // Load format
  if (!format)
    format = fs.readFileSync(DEFAULT_FORMAT, 'utf8');
  else {
    try {
      fs.accessSync(format, fs.F_OK | fs.R_OK);
      format = fs.readFileSync(format, 'utf8');
    } catch (err) {
      try {
        var localFormat = path.resolve(FORMAT_DIR, format + '.jade');
        fs.accessSync(localFormat, fs.F_OK);
        format = fs.readFileSync(localFormat, 'utf8');
      } catch (err2) {}
    }
  }

  // Load theme
  if (!theme)
    theme = fs.readFileSync(DEFAULT_THEME, 'utf8');
  else {
    try {
      fs.accessSync(theme, fs.F_OK | fs.R_OK);
      theme = fs.readFileSync(theme, 'utf8');
    } catch (err) {
      try {
        var localTheme = path.resolve(THEME_DIR, theme + '.css');
        fs.accessSync(localTheme, fs.F_OK);
        theme = fs.readFileSync(localTheme, 'utf8');
      } catch (err2) {}
    }
  }

  // Load default options, then add user options
  resume.__opts = DEFAULT_OPTS;
  for (var opt in opts) {
    resume.__opts[opt] = opts[opt];
  }

  // Preserve new line characters through Jade
  resume = JSON.parse(JSON.stringify(resume).replace(/\\n/g, '\\\\n'));

  // Load theme into info object
  resume.__theme = resume.__opts.pretty ? theme : new CleanCSS().minify(theme).styles;

  // Render Jade template, then convert new line characters to break tags
  return jade.render(format, resume).replace(/\\n/g, '<br>');
}
