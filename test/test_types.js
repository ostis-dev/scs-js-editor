const assert = require('assert');
const scs = require('../build/scs');

describe('Type utils', function() {

    describe('level 1', function() {

        it('#IsLevel1', function() {
            assert.ok(!scs.SCsTypeUtils.IsLevel1(''));

            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_node#'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_node#a'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_link#_bd'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_edge_dcommon#d'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_edge_ucommon#e'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_edge_main#c'));
            assert.ok(scs.SCsTypeUtils.IsLevel1('sc_edge_access#f'));
        });

        it('#SplitLevel1', function() {
            function check(idtf, expected) {
                const r = scs.SCsTypeUtils.SplitLevel1(idtf);
                let result = true;

                function doFail() { assert.fail(idtf); result = false; }

                if (!r || r.length != expected.length) {
                    doFail();
                }

                for (let i = 0; i < r.length; ++i) {
                    if (r[i] != expected[i]) {
                        doFail();
                    }
                }

                return result;
            }

            assert.ok(check('sc_node#', ['sc_node', '']));
            assert.ok(check('sc_node#_a', ['sc_node', '_a']));
            assert.ok(check('sc_link#_a', ['sc_link', '_a']));
            assert.ok(check('sc_edge_dcommon#_a', ['sc_edge_dcommon', '_a']));
            assert.ok(check('sc_edge_ucommon#_a', ['sc_edge_ucommon', '_a']));
            assert.ok(check('sc_edge_main#_a', ['sc_edge_main', '_a']));
            assert.ok(check('sc_edge_access#_a', ['sc_edge_access', '_a']));
        });
    });
});