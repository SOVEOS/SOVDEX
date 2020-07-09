import mongoose from 'mongoose'

// DataBase: Production/Test
const database = (process.env.NODE_ENV == 'production') ? 'production' : 'test'

const options = {
	ssl: true,
	useNewUrlParser: true,
	auto_reconnect: true,
	useCreateIndex: true,
	// socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
	useUnifiedTopology: true,
}

const connection = ({ user, password, cluster }) => `${user}:${password}@${cluster}.mongodb.net/${database}?retryWrites=true`

mongoose.connect(`mongodb+srv://${connection({ ...global.config.db })}`, options)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => console.log('\x1b[36m', '🚀 Connected to DataBase'))

export default mongoose