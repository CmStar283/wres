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
