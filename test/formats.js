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
var assert = require('assert');
var wres = require('..');

describe('Formats', function() {
  fs.readdirSync(path.resolve(__dirname, '../formats')).forEach(function (e) {

    // Load each format
    var formatFile = path.resolve(__dirname, '../formats/' + e);
    var format = path.basename(e, path.extname(e)); // Determine name of the exmaple
    var template = path.resolve(__dirname, '../examples/template.yml');

    // Test file, pre-defined and string types of formats
    it(format + ' (file) renders without error', function() {
      assert.doesNotThrow(function() {
        wres.render(template, formatFile, null, null);
      });
    });
    it(format + ' (pre-defined) renders without error', function() {
      assert.doesNotThrow(function() {
        wres.render(template, format, null, null);
      });
    });
    it(format + ' (string) renders without error', function() {
      assert.doesNotThrow(function() {
        wres.render(template, fs.readFileSync(formatFile, 'utf8'), null, null);
      });
    });
  });
});
