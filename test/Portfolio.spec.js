process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let fs = require('fs')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../src/server')
let should = chai.should()


chai.use(chaiHttp)

describe('PORTFOLIO', () => {

    /*
    * Test the /GET route
    */

    describe('/GET Portfolio', () => {
      it('it should GET all the cattle portfolios', (done) => {
        chai.request(server)
            .get('/portfolio/get')
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.an('object')
              done();
            });
      });
    });

  /*
  * Test the /POST route
  */

  describe('/POST Portfolio', () => {
      it('it should POST a cattle portfolio with image', (done) => {
        chai.request(server)
            .post('/portfolio/create')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('name', 'cow')
            .attach('photo',
                    fs.readFileSync(__dirname + '/test.jpg'),
                    'test.jpg')
            .end((err, res) => {
                   res.should.have.status(200)
                   res.body.should.be.a('object')
                   res.body.should.have.property('msg').eql('Cattle Protfolio Created')
                   done()
            });
      });
  });

});