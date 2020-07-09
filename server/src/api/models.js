import mongoose from 'mongoose'

const tick = {
    symbol: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
		required: true,
    }
}

const schema = new mongoose.Schema(tick)
export const tickModel = mongoose.model('ticks', schema)

// connect to "production" db from dev mode
const db = mongoose.connection.useDb('production')
export const productionTickModel = db.model('ticks', schema)
