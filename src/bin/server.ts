import 'module-alias/register'
import application from '@root/app'
import { config } from '@core/config'
import logger from '@core/logger'
import toobusy_js from 'toobusy-js'

if (config.ENVIRONMENT === 'production') {
	process.on('uncaughtException', (err: Error) => {
		logger.info('UNCAUGHT EXCEPTION! 💥 Shutting down...')
		logger.error(err.name, err.message)
		process.exit(1)
	})
}

const { app, port } = application.createServer()

const server = app.listen(port, onListening)
app.on('error', onError)

function onError(error: any) {
	if (error.syscall !== 'listen') {
		throw error
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
	switch (error.code) {
		case 'EACCES':
			logger.error(`${bind} requires elevated privileges`)
			process.exit(1)
			break
		case 'EADDRINUSE':
			logger.error(`${bind} + is already in use`)
			process.exit(1)
			break
		default:
			throw error
	}
}

function onListening() {
	logger.info(`Server started on port : ${port}`)
}

process.on('unhandledRejection', (err: Error) => {
	logger.error('UNHANDLED REJECTION! 💥 Shutting down...')
	logger.error(err.name, err.message)
	server.close(() => {
		process.exit(1)
	})
})

process.on('SIGTERM', () => {
	logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully')
	server.close(() => {
		logger.info('💥 Process terminated!')
	})
})

process.on('SIGINT', () => {
	server.close()
	// calling .shutdown allows your process to exit normally
	toobusy_js.shutdown()
	process.exit()
})
