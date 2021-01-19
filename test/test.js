const assert = require('assert' );

const ObjectMerge = require('../lib/merge');

describe( 'Tests', () =>
{
    it( 'should merge objects', () =>
    {
        assert.deepStrictEqual
        (
            ObjectMerge({ foo : 'bar' }, { bar: 'foo' }, { foobar: 'barfoo' }),
            {
                foo : 'bar',
                bar : 'foo',
                foobar: 'barfoo'
            },
            'Didn`t merge objects properly'
        );

        assert.deepStrictEqual
        (
            ObjectMerge({ foo : 'bar', bar: { foo: 'foo' }}, { bar: { foo: 'bar' }}, { foobar: [ 'a', 'b' ]}),
            {
                foo : 'bar',
                bar : { foo : 'bar' },
                foobar: [ 'a', 'b' ]
            },
            'Didn`t merge objects properly'
        );

        assert.deepStrictEqual
        (
            ObjectMerge({ foo : 'bar', bar: { foo: 'foo' }}, { bar: undefined }),
            {
                foo : 'bar',
                bar : { foo : 'foo' }
            },
            'Didn`t merge objects properly'
        );

        assert.deepStrictEqual
        (
            ObjectMerge({ foo : [ 1, 2 ], bar: { foo: 'foo' }}, { foo: [ 3, 4 ] }),
            {
                foo : [ 3, 4 ],
                bar : { foo : 'foo' },
            },
            'Didn`t merge objects properly'
        );



        assert.deepStrictEqual
        (
            ObjectMerge({ foo : [ 1, 2 ], bar: { foo: 'foo' }}, { bar: null }),
            {
                foo : [ 1, 2 ]
            },
            'Didn`t merge objects properly'
        );
    });

    it("should prevent prototype pollution", () => {
      var obj = {};
      var result = ObjectMerge(obj, JSON.parse('{"__proto__":{"polluted":"Yes! Its Polluted"}}'))
      assert.equal(obj.polluted, undefined);
      assert.equal({}.polluted, undefined);
    })
});