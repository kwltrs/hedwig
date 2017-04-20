var should = require('chai').should();
var Niffy = require('niffy');

describe('Components', function () {
  var basehost = 'https://vg.no';
  var testhost = 'http://db.no';
  var niffy;

  before(function () {
    niffy = new Niffy(basehost, testhost, {
      show: false,
    });
  });

  after(function* () {
    yield niffy.end();
  });

  describe('Buttons', function () {
    it('Buttons', function* () {
      yield niffy.test('/');
    });
  });

});
