const expect = require('chai').expect;
const app = require('../app');
// const request = require('supertest');
const session = require('supertest-session')(app);
const { query } = require('../models/db.model');
const bcrypt = require('bcrypt');

// testet börjar här
describe('meeps route', () => {
  let authenticatedSession = null;
  
  before('register user', async (done) => {
    // await query('DELETE FROM users WHERE email = ?',  process.env.TEST_EMAIL);
    const sql = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, now(), now())';
    bcrypt.hash(process.env.TEST_PASSWORD, 10, async function (err, hash) {
      if (err) return done(err);
      await query(sql, [process.env.TEST_USER, process.env.TEST_EMAIL, hash]);
    });
    return done();
  });

  before('make sure there is an authenticated session', (done) => {
    session.post('/login')
      .type('form')
      .send({
        username: process.env.TEST_USER,
        password: process.env.TEST_PASSWORD
      })
      .expect(302)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = session;
        return done();
      });
  });

  describe('GET /', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should return OK status', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      request.get('/meeps')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
    });
  });
  describe('GET /:id', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should return OK status', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      request.get('/meeps/:id')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
    });
  });
  describe('POST /', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should create a meep provided request body is valid', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      authenticatedSession.post('/meeps')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
      });
    });
    it('should update a meep provided request body is valid and contains a id', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      authenticatedSession.post('/meeps')
      .expect(302)
      .expect('Location', '/meeps/' + meep.id)
      .end((err, res) => {
        if (err) throw err;
      });
    });
  });

  describe('/delete', () => {
    it('it should promp user for delete confirmation', () => {
      authenticatedSession.get('/meeps/delete')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
    });
    it('it should delete resource', () => {
      authenticatedSession.post('/meeps/delete')
      .expect(302)
      .end((err, res) => {
        if (err) throw err;
      });
    });
  });
});