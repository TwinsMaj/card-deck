import { standardSuit } from '../suits';
import { standardRank } from '../ranks';

export type Rank = standardRank.Rank;
export type Suit = standardSuit.Suit;

export interface RandomGenerator {
	(size: number): number;
}
