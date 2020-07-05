import { CronJob } from 'cron'

import { setSymbolData, pairs } from './db/helper'

// tick every minute
var job = new CronJob('0 */1 * * * *', () => {
   pairs.forEach(i => setSymbolData(i))
})

job.start()