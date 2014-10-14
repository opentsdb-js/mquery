Metric Query
============
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [OpenTSDB](http://opentsdb.net) metric query factory.

OpenTSDB permits two query [types](/docs/build/html/api_http/query/index.html): _[metric](https://github.com/opentsdb-js/mquery)_ and _[tsuid](https://github.com/opentsdb-js/tquery)_.

Metric queries are general queries which return an indeterministic number of timeseries. OpenTSDB implements metric queries by searching for timeseries matching the metric criteria, e.g., `metric name` and `tag`.

TSUID queries request a specific timeseries having a unique id. Every timeseries has an assigned [unique identifier](http://opentsdb.net/docs/build/html/user_guide/backends/hbase.html#uid-table-schema), which is based on `metric name` and any `tags`.

This module provides a metric query generator.



### Install

For use in Node.js,

``` bash
$ npm install opentsdb-mquery
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


### Usage

To use the module,

``` javascript
var createQuery = require( 'opentsdb-mquery' );
```

To create a new metric query,

``` javascript
var mQuery = createQuery();
```

A metric query is configurable and has the following methods...


#### mQuery.aggregator( [aggregator] )

This method is a setter/getter. If no `aggregator` is provided, returns the query [aggregator](http://opentsdb.net/docs/build/html/api_http/aggregators.html). The default aggregator is `avg`. To set a different `aggregator`,

``` javascript
mQuery.aggregator( 'min' );
```


#### mQuery.downsample( [downsample] )

This method is a setter/getter. If no `downsample` function is provided, returns the configured `downsample` function. By default, downsampling is turned off (i.e., set to `null`). To specify a `downsample` function,

``` javascript
mQuery.downsample( '5s-avg' );
```


#### mQuery.rate( [bool] )

This method is a setter/getter. If no boolean flag is provided, returns the flag indicating whether to return the difference between consecutive data values. By default, the flag is `false`. To turn on difference calculation,

``` javascript
mQuery.rate( true );
```

Note that rate calculation requires a set of three options.



#### mQuery.rateOptions( [object] )

This method is a setter/getter. If no configuration object is provided, returns the rate options: `counter`, `counterMax`, `resetValue`. `counter` must be a boolean; `counterMax` must be numeric or `null`; and `resetValue` must be numeric.

By default,

``` javascript
var rateOptions = {
	"counter": false,
	"counterMax": null,
	"resetValue": 0
};
```


#### mQuery.tags( [tag, [value]] )

This method is a setter/getter. If no arguments are provided, returns all tag names and their values. If a `tag` name is specified, returns the value for that tag. Otherwise, sets a `tag` to the specified `value`.

``` javascript
mQuery.tags( 'nid', '*' );
```

The `*` (wildcard) indicates all values for a `tag`.



#### mQuery.dtag( tag )

This method deletes a query `tag`.

``` javascript
// Add a tag:
mQuery.tags( 'nid', '*' );

// Delete the tag:
mQuery.dtag( 'nid' );
```


#### mQuery.metric( [name] )

This method is a setter/getter. If no `metric name` is provided, returns the query `metric name`. A `metric name` is __required__ to encode a metric query. To set a `metric name`,

``` javascript
mQuery.metric( 'mem.utilization' );
```


## Examples

``` javascript
var createQuery = require( 'opentsdb-mquery' );

var mQuery = createQuery();

mQuery
	.aggregator( 'sum' )
	.downsample( '5m-avg' )
	.rate( false )
	.metric( 'mem.utilization' )
	.tags( 'nid', '1234,5678' )
	.tags( 'name', 'beep,boop' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/opentsdb-mquery.svg
[npm-url]: https://npmjs.org/package/opentsdb-mquery

[travis-image]: http://img.shields.io/travis/opentsdb-js/mquery/master.svg
[travis-url]: https://travis-ci.org/opentsdb-js/mquery

[coveralls-image]: https://img.shields.io/coveralls/opentsdb-js/mquery/master.svg
[coveralls-url]: https://coveralls.io/r/opentsdb-js/mquery?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/mquery.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/mquery

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/mquery.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/mquery

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/mquery.svg
[github-issues-url]: https://github.com/opentsdb-js/mquery/issues