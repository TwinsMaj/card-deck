import { NextFunction, Request, Response } from 'express';
import { initializeDeck } from '../lib/decks/standard';
import { StatusCodes } from 'http-status-codes';
import { shuffleCards } from '../lib/decks/deck';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import Deck from '../models/deck';

const { CREATED, OK, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;

const createDeck = (req: Request, res: Response, next: NextFunction) => {
	const SHORT_SIZE = 36;
	const { type, shuffled } = req.body;
	const deckId = uuidv4();

	const deckOfCards = initializeDeck();
	const remaining = type.toLowerCase() === 'short' ? SHORT_SIZE : deckOfCards.length;

	if (shuffled) {
		shuffleCards(deckOfCards);
	}

	const deck = new Deck({
		_id: new mongoose.Types.ObjectId(),
		deckId,
		type,
		shuffled,
		remaining,
		cards: type.toLowerCase() === 'short' ? deckOfCards.splice(0, SHORT_SIZE) : deckOfCards,
	});

	return deck
		.save()
		.then((deck) => {
			const { deckId, type, shuffled, remaining } = deck;
			res.status(CREATED).json({ deckId, type, shuffled, remaining });
		})
		.catch((error) => res.status(INTERNAL_SERVER_ERROR).json({ error }));
};

const openDeck = (req: Request, res: Response, next: NextFunction) => {
	const deckId = req.params.deckId;
	return Deck.find({ deckId })
		.then((deck) =>
			deck.length > 0 ? res.status(OK).json({ deck }) : res.status(NOT_FOUND).json({ message: 'deck not found' }),
		)
		.catch((error) => res.status(INTERNAL_SERVER_ERROR).json({ error }));
};

const drawCard = async (req: Request, res: Response, next: NextFunction) => {
	const { deckId, count } = req.body;

	try {
		const deck = await Deck.findOne({ deckId });
		if (deck) {
			let { remaining, cards = [] } = deck;

			const cardsDrawn = cards.splice(0, count);
			remaining = cards.length;

			deck.remaining = remaining;
			deck.cards = cards;

			await deck.save();
			return res.status(OK).json({ cards: cardsDrawn });
		} else {
			return res.status(NOT_FOUND).json({ message: 'deck not found' });
		}
	} catch (error) {
		return res.status(INTERNAL_SERVER_ERROR).json({ error });
	}
};

export default { createDeck, openDeck, drawCard };
