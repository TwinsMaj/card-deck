import chai from 'chai';
import { StatusCodes } from 'http-status-codes';
import Deck from '../../models/deck';
import chaiHttp = require('chai-http');
import server from '../../index';

const should = chai.should();
chai.use(chaiHttp);

describe('Deck API', () => {
	beforeEach((done) => {
		//Before each test we empty the database
		Deck.remove({}, (err) => {
			done();
		});
	});

	it('it should respond when pinged', (done) => {
		chai
			.request(server)
			.get('/health-check')
			.end((_err, res) => {
				res.should.have.status(StatusCodes.OK);
				done();
			});
	});

	it('should create a deck of cards', (done) => {
		const payload = {
			type: 'FULL',
			shuffled: false,
		};

		chai
			.request(server)
			.post('/deck/create')
			.send(payload)
			.end((err, res) => {
				res.should.have.status(StatusCodes.CREATED);
				res.body.should.be.a('object');
				res.body.should.have.property('deckId');
				res.body.should.have.property('remaining').eql(52);
				res.body.should.have.property('shuffled').eql(false);
				done();
			});
	});

	it('should create a short deck of cards', (done) => {
		const payload = {
			type: 'SHORT',
			shuffled: true,
		};

		chai
			.request(server)
			.post('/deck/create')
			.send(payload)
			.end((err, res) => {
				res.should.have.status(StatusCodes.CREATED);
				res.body.should.be.a('object');
				res.body.should.have.property('deckId');
				res.body.should.have.property('remaining').eql(36);
				res.body.should.have.property('shuffled').eql(true);
				done();
			});
	});

	it('should draw cards', (done) => {
		const payload = {
			type: 'FULL',
			shuffled: true,
		};

		chai
			.request(server)
			.post('/deck/create')
			.send(payload)
			.end((err, res) => {
				const { deckId } = res.body;
				const drawDetails = { deckId, count: 3 };

				chai
					.request(server)
					.post('/deck/draw')
					.send(drawDetails)
					.end((err, res) => {
						res.should.have.status(StatusCodes.OK);
						res.body.should.be.a('object');
						res.body.should.have.property('cards');
						res.body.should.have.property('cards').be.a('array');
						res.body.should.have.property('cards').to.have.lengthOf(3);
						// res.body.length.should.be.eql(3);
						done();
					});
			});
	});
});
