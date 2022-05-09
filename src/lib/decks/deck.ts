import { Card } from '../card/card';
import { getRandom, shuffle } from '../shuffle';
import { RandomGenerator } from '../types';

export const shuffleCards = (deck: Card[], randFunc: RandomGenerator = getRandom) => {
	shuffle(deck, randFunc);
};

export const draw = (deck: Card[], count: number): Card[] => {
	if (count <= 0) {
		return [];
	}

	if (count > deck.length) {
		throw new Error('Cannot draw from deck; not enough cards remaining');
	}

	const cards = deck.splice(0, count);
	return cards;
};
