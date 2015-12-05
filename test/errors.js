'use strict';

var assert = require('assert');
var wres = require('..');

describe('Error Handling', function() {
  it('null resume throws error', function() {
    assert.throws(function() {
      wres.render();
    });
  });
  it('invalid resume throws error', function() {
    assert.throws(function() {
      wres.render('*');
    });
  });
});
