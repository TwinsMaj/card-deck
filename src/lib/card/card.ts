import { Rank, Suit } from '../types';

export class Card {
	public readonly suit: Suit;
	public readonly value: Rank;
	public readonly code: string;

	constructor(suit: Suit, value: Rank, code: string) {
		this.suit = suit;
		this.value = value;
		this.code = code;
	}
}
