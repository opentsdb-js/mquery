
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Parent class:
	Uber = require( 'opentsdb-query' ),

	// Module to be tested:
	createQuery = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'opentsdb-mquery', function tests() {
	'use strict';

	// SETUP //

	var query;

	beforeEach( function() {
		query = createQuery();
	});


	// TESTS //

	it( 'should export a factory function', function test() {
		expect( createQuery ).to.be.a( 'function' );
	});

	it( 'should inherit from the Query parent class', function test() {
		assert.ok( query instanceof Uber, 'query is not an instance of parent Query.' );
	});

	it( 'should have a type attribute', function test() {
		assert.strictEqual( query.type.toLowerCase(), 'metric' );
	});

	it( 'should provide a method to set/get the metric name', function test() {
		expect( query.metric ).to.be.a( 'function' );
	});

	it( 'should not allow a non-string metric name', function test() {
		var values = [
				5,
				[],
				{},
				true,
				null,
				undefined,
				NaN,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				query.metric( value );
			};
		}
	});

	it( 'should set the metric name', function test() {
		query.metric( 'cpu.utilization' );
		assert.strictEqual( query.metric(), 'cpu.utilization' );
	});

	// TAGS //

	describe( 'tags', function tests() {

		it( 'should provide a method to get/set tag names and values', function test() {
			expect( query.tags ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string tag name', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					query.tags( value );
				};
			}
		});

		it( 'should not allow a non-string tag value', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					query.tags( 'tag', value );
				};
			}
		});

		it( 'should set a tag value', function test() {
			var tag = 'foo',
				value = 'bar';
			query.tags( tag, value );
			assert.strictEqual( query.tags( tag ), value );
		});

		it( 'should return all tags', function test() {
			var tags = {
					'tag1': 'value1',
					'tag2': 'value2'
				};

			query.tags( 'tag1', tags.tag1 );
			query.tags( 'tag2', tags.tag2 );
			assert.deepEqual( query.tags(), tags );
		});

		it( 'should return a tag value', function test() {
			var tag = 'beep',
				value = 'boop';
			query.tags( tag, value );
			assert.strictEqual( query.tags( tag ), value );
		});

	});


	// DELETE TAG //

	describe( 'deleting a tag', function tests() {

		it( 'should provide a method to delete a tag', function test() {
			expect( query.dtag ).to.be.a( 'function' );
		});

		it( 'should require a tag name as input', function test() {
			expect( query.dtag ).to.throw( Error );
		});

		it( 'should not allow a non-string tag name', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					query.dtag( value );
				};
			}
		});

		it( 'should delete a tag', function test() {
			var tag = 'tag',
				value = 'value';
			query.tags( tag, value );
			assert.strictEqual( query.tags( tag ), value );
			query.dtag( tag );
			assert.isUndefined( query.tags( tag ) );
		});

	}); // end TESTS dtag

});