# Server 

Generates OHLC data from blockchain tick.

* Pairs: **soveos, svxeos, sovusdt, eospbtc, powpbtc**
* Intervals: **15m, 1h, 4h, 1d** etc. Based on repo [timestring](https://www.npmjs.com/package/timestring)
* Max **300** candles

### Algoritm

1. Сonnect to NoSQL (MongoDB Atlas) database
2. Save tick every 3 minutes as `{symbol:'soveos', price:0.0004, time:1593880500000}`
3. Build OHLC candles using minute ticks in [candle.js](src/modules/candles.js)
   1. Build sessions `[{ openTime:Timestamp, closeTime:Timestamp}]`
   2. Fill session with range of ticks `[{symbol:String, price:Number, time:Timestamp}, ... ]`
   3. Create candle from range data `{open:Number, high:Number, low:Number, close:Number}` for every session
4. With long-term accumulation, auto-removes excess data from database every `1h`

## How to use

Set access to MongoDB Atlas in [config.js](src/config.js).

```javascript
db: {
		user: '<username>',
		password: '<password>',
		cluster: '<cluster>'
    },
```

* Request to `http://localhost:3000/?symbol=soveos&interval=15m&limit=100`
* Response `[{openTime:Timestamp, closeTime:Timestamp, open:Number, high:Number, low:Number, close:Number}, ... ]`

### Update pairs

List of pairs is formed on the basis of [scheme](src/api/queries.js#L5). 

* Auto getting array of pairs `Object.keys(schema)` => `['soveos', 'svxeos', ... ]`
* Value of pair is using for request params

If need add pair, just update schema with same code `key:value`

* `key` it is name of pair
* `value` params for getting `price` from blockchain

```js
 svxeos: {
        "code": "sovdexrelays",
        "scope": "EOS",
        "table": "svxpair",
        "json": true
},
```