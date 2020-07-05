# Server 

The server stores data from blockchain for all pairs and then generates candles from them upon request.

* Pairs: **soveos, svxeos, sovusdt, eospbtc, powpbtc**
* Intervals: **5m, 30m, 15m, 1h, 4h** etc. Based on repo [timestring](https://www.npmjs.com/package/timestring)

### How to use

* Request to `http://localhost:3000/?symbol=sovdex&interval=5m&limit=100` or `http://<HOST_NAME>/?..`
* Response `[{openTime:Timestamp, closeTime:Timestamp, open:Number, high:Number, low:Number, close:Number}, {} ]`

### Algoritm

1. `database.db` automatically created if was not created
2. Cron run task every **minute**
3. Get and save price for all pairs in database every cron interval: `{symbol:'soveos', price:0.0004, time:1593880500000}`
4. Upon request to endpoint `http://localhost:3000/?symbol=sovdex&interval=5m&limit=100`, candles are generated from minute tick and response to user in OHLC format
