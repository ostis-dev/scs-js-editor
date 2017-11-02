const assert = require('assert');
const scs = require('../build/scs');

describe('SCs-level 1 parsing', function() {
    describe('one triple', function() {
        it('should be parsed', function() {
            const parser = new scs.SCsTriplesParser();
            assert.ok(parser.Parse('sc_node#a | sc_edge#e1 | sc_node#b;;'));
        });
    });
});