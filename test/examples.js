'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var wres = require('..');

describe('Examples', function() {
  fs.readdirSync(path.resolve(__dirname, '../examples')).forEach(function (e) {
    if (/\.(yml|json)/.test(e)) {
      it(path.basename(e, path.extname(e)) + ' renders without error', function() {
        assert.doesNotThrow(function() {
          wres.render(
            null,
            null,
            fs.readFileSync(path.resolve(__dirname, '../examples/' + e), 'utf8'),
            null
          );
        });
      });
    }
  });
});
