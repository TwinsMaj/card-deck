import { standardSuit } from '../suits';
import { standardRank } from '../ranks';
import { enumKeys } from '../utils';
import { Card } from '../card';
// import { Card } from '../card/Card';

const { Suit } = standardSuit;
const { Rank } = standardRank;

export const initializeDeck = (): Card[] => {
	const deck: Card[] = [];

	for (const suitName of enumKeys(Suit)) {
		for (const rankName of enumKeys(Rank)) {
			const code = `${rankName.charAt(0)}${suitName.charAt(0)}`.toUpperCase();
			deck.push(new Card(Suit[suitName], Rank[rankName], code));
		}
	}

	return deck;
};
