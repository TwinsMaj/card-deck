import express from 'express';
import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './logger/logging';
import { requestLogger } from './middleware/request-logger';
import { apiRules } from './middleware/api-rules';
import { handleError } from './middleware/error-handler';
import { healthCheck } from './routes/health-check';
import deckRoutes from './routes/deck';

const app = express();
app.use(morgan('dev'));

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => {
	Logging.info('Mongo connected successfully.');
});

const initServer = () => {
	// Log requests
	app.use(requestLogger);

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	// define API Rules
	app.use(apiRules);

	/** Routes */
	app.use('/deck', deckRoutes);

	// Healthcheck
	app.get('/health-check', healthCheck);

	/** Error handling */
	app.use(handleError);

	http
		.createServer(app)
		.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};

initServer();

export = app;
