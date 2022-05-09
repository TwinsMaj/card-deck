import Logging from '../logger/logging';
import { Request, Response, NextFunction } from 'express';

export const handleError = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error('Not found');

	Logging.error(error);

	res.status(404).json({
		message: error.message,
	});
};
