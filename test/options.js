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

var assert = require('assert');
var wres = require('..');
var path = require('path');
var fs = require('fs');

var TEMPLATE = fs.readFileSync(path.resolve(__dirname, '../examples/template.yml'), 'utf8');
var TEST_OPTS = {
  density: 'comfy',
  pretty: false
}

describe('Options', function() {
  it('processes options without error', function() {
    assert.doesNotThrow(function() {
      wres.render(TEMPLATE, null, null, TEST_OPTS);
    });
  });
  it('processes null options without error', function() {
    assert.doesNotThrow(function() {
      wres.render(TEMPLATE, null, null, null);
    });
  });
});
