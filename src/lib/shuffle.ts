import { RandomGenerator } from './types';

export function shuffle<T>(deck: T[], randNumbers: RandomGenerator) {
	let j: number;

	for (let i = deck.length - 1; i > 0; i--) {
		j = randNumbers(i);
		const temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
}

export const getRandom: RandomGenerator = (size: number) => {
	return (Math.random() * size) | 0;
};
