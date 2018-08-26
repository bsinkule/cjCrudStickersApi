const knex = require('../db/knex')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const fixtures = require('./fixtures')

describe('CRUD Stickers', () => {
    before((done) => {
        // run migrations
        knex.migrate.latest()
            .then(() => {
                // run seeds
                return knex.seed.run()
            }).then(() => done())
    })

    it('Lists all records', function (done) {
        request(app)
            .get('/api/v1/stickers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array')
                expect(response.body).to.deep.equal(fixtures.stickers)
                done()
            })
    })

    it('Show one record by id', function (done) {
        request(app)
            .get('/api/v1/stickers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.stickers[0])
                done()
            })
    })

    it('Creates a record', (done) => {
        request(app)
            .post('/api/v1/stickers')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object')
                fixtures.sticker.id = response.body.id
                expect(response.body).to.deep.equal(fixtures.sticker)
                done()
            })
    })

    it('Updates a record', (done) => {
        fixtures.sticker.rating = 9
        request(app)
            .put('/api/v1/stickers/10')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal(fixtures.sticker)
                done()
            })
    })

    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/v1/stickers/9')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object')
                expect(response.body).to.deep.equal({
                    deleted: true
                })
                done()
            })
    })
})