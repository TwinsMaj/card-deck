import express from 'express';
import controller from '../controllers/deck-controller';
import { Schemas, ValidateJoi } from '../middleware/joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.deck.create), controller.createDeck);
router.post('/draw', ValidateJoi(Schemas.deck.draw), controller.drawCard);
router.get('/open/:deckId', controller.openDeck);

export = router;
