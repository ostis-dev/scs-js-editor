import * as scs from '../src/index';
import { assert } from 'chai';

describe('Check alias parse locations', function() {
    
    describe('ParsedAliases', function() {
        it('CheckLocations', function() {
            const parser = new scs.SCsTriplesParser();
            assert.ok(parser.Parse('_a -> b;;\nb -> cd;;'));
        });
    });
    
});