import { CronJob } from 'cron'

import { saveTick, deleteTicks, pairs } from '../api/queries'

// Save price every minute
new CronJob('0 */3 * * * *', () => {
   pairs.forEach(i => saveTick(i))
}).start()

// Delete extra values ​​in the database every 1h = 60m
new CronJob('0 */60 * * * *', () => deleteTicks()).start()