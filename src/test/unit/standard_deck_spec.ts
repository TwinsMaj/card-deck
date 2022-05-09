import { expect } from 'chai';
import { initializeDeck } from '../../lib/decks/standard';

describe('Standard Deck', () => {
	it('should initialize deck', () => {
		const deck = initializeDeck();

		expect(deck.length).to.eql(52);
	});
});
