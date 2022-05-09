import mongoose, { Document, Schema } from 'mongoose';

export type CardDetail = {
	value: string;
	suit: string;
	code: string;
};

export interface IDeck {
	cards?: CardDetail[];
	deckId: string;
	remaining: number;
	shuffled: boolean;
	type: string;
}

export interface IDeckModel extends IDeck, Document {}

const DeckSchema: Schema = new Schema(
	{
		cards: [
			{
				value: { type: String, required: true },
				suit: { type: String, required: true },
				code: { type: String, required: true },
			},
		],
		deckId: { type: String, required: true },
		remaining: { type: Number, required: true },
		shuffled: { type: Boolean, required: true },
		type: { type: String, required: true },
	},
	{
		versionKey: false,
	},
);

export default mongoose.model<IDeckModel>('Deck', DeckSchema);
