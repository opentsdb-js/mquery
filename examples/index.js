var createFactory = require( './../lib' );

var mQuery = createFactory();

mQuery
	.aggregator( 'sum' )
	.downsample( '5m-avg' )
	.rate( false )
	.metric( 'mem.utilization' )
	.tags( 'nid', '1234,5678' )
	.tags( 'name', 'beep,boop' );

// Demonstrate that the private properties have been set:
console.log( mQuery );