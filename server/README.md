# Server 

Generates OHLC data from blockchain tick.

* Pairs: **soveos, svxeos, sovusdt, eospbtc, powpbtc**
* Intervals: **5m, 30m, 15m, 1h, 4h** etc. Based on repo [timestring](https://www.npmjs.com/package/timestring)
* Max **300** candles

### Algoritm

1. Сonnect to NoSQL (MongoDB Atlas) database
2. Save tick every minute as `{symbol:'soveos', price:0.0004, time:1593880500000}`
3. Build OHLC candles using minute ticks
4. With long-term accumulation, auto-removes excess data from database

## How to use

Set access to MongoDB Atlas in [config.js](/src/config.js).

```javascript
db: {
		user: '<username>',
		password: '<password>',
		cluster: '<cluster>'
    },
```

* Request to `http://localhost:3000/?symbol=soveos&interval=5m&limit=100`
* Response `[{openTime:Timestamp, closeTime:Timestamp, open:Number, high:Number, low:Number, close:Number}, ... ]`
