import supertest from 'supertest'
import chai from 'chai'
import server from '../server'

const { expect } = chai
const request = supertest.agent(server)

describe('General route', () => {
  it('Enter home page', (done) => {
    request
      .get('/')
      .then((res) => {
        let result = res.res.text
        expect(result).to.equal('Hello world')
        done()
      })
      .catch((error) => {
        console.error(error)
        done()
      })
  })
})