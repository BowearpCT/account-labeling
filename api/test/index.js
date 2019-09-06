const chai = require('chai')
const chaiHttp = require('chai-http')
const { after, before, describe, it } = require('mocha')

const server = require("../server").default

chai.use(chaiHttp)
chai.should()

describe('Testing unit 1', () => {
  before(done => {
    // Do something here before test
    done()
  })

  describe('GET /', () => {
    it('it should have message OK', done => {
      chai
        .request(server)
        .get('/')
        .end((e, res) => {
          res.should.have.status(200)
          res.body.data.eql('Hello World!')
          done()
        })
    })
  })

  describe('POST /', () => {
    it('it should have message OK with POST', done => {
      chai
        .request(server)
        .post('/')
        .set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbjAwMSIsInJvbGUiOjEsImlhdCI6MTU2NjgwNTQ4MzU1MH0.ZdkdBoZ0ZDfTnGGLe_9ltsh661kohJCGmPqon76X4ic')
        .send({
          data: 'OK',
        })
        .end((e, res) => {
          res.should.have.status(200)
          res.body.data.eql('Post method')
          done()
        })
    })
  })

  after(done => {
    // Do something here after test
    done()
  })
})