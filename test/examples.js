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
var yaml = require('js-yaml');

describe('Examples', function() {
  fs.readdirSync(path.resolve(__dirname, '../examples')).forEach(function (e) {
    // Load each example into a YAML and JSON string, if applicable
    var r_yaml, r_json, r_file = path.resolve(__dirname, '../examples/' + e);
    if(/\.yml/.test(e)) {
      r_yaml = fs.readFileSync(r_file, 'utf8');
      r_json = JSON.stringify(yaml.safeLoad(r_yaml));
    } else if (/\.json/.test(e)) {
      r_json = fs.readFileSync(r_file, 'utf8');
      r_yaml = yaml.safeDump(r_json);
    } else {
      return; // Not a YAML or JSON string, so skip
    }

    var example = path.basename(e, path.extname(e)); // Determine name of the exmaple
    var tempDir = path.join(__dirname, 'temp');
    try {
      fs.mkdirSync(tempDir);
    } catch (err) {}

    // Test wres render with YAML and JSON formats of each example
    it(example + ' (yaml file) renders without error', function() {
      var file = path.join(tempDir, 'resume.yml');
      fs.writeFileSync(file, r_yaml);
      assert.doesNotThrow(function() {
        wres.render(file, null, null, null);
      });
    });
    it(example + ' (json file) renders without error', function() {
      var file = path.join(tempDir, 'resume.json');
      fs.writeFileSync(file, r_json);
      assert.doesNotThrow(function() {
        wres.render(file, null, null, null);
      });
    });
    it(example + ' (yaml string) renders without error', function() {
      assert.doesNotThrow(function() {
        wres.render(r_yaml, null, null, null);
      });
    });
    it(example + ' (json string) renders without error', function() {
      assert.doesNotThrow(function() {
        wres.render(r_json, null, null, null);
      });
    });
  });
});
