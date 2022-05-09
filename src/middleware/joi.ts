import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../logger/logging';

export const ValidateJoi = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);

			next();
		} catch (error) {
			Logging.error(error);

			return res.status(422).json({ error });
		}
	};
};

export const Schemas = {
	deck: {
		create: Joi.object().keys({
			type: Joi.string().required(),
			shuffled: Joi.bool().required(),
		}),
		draw: Joi.object().keys({
			deckId: Joi.string().required(),
			count: Joi.number().required(),
		}),
	},
};
