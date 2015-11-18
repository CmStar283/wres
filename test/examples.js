'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var wres = require('..');

describe('Error Handling', function() {
  it('null resume throws error', function() {
    assert.throws(function() {
      wres.render(null, null, null, null);
      }, Error
    );
  });
});
