import app from '../../src/app';
import supertest from 'supertest';
import assert from 'power-assert';
import mongoose from 'mongoose';
import UserService from '../../src/services/user';

const request = supertest(app);
const userService = new UserService();

after(
  () =>
    new Promise((resolve) => {
      mongoose.connection
        .collection('users')
        .drop()
        .then(resolve)
        .catch(resolve);
    })
);

/**
 * Test Data
 */
const testData = {
  name: 'template user',
  password: '123asdfg',
  email: '12345@gmail.com',
  id: null,
  token: null,
};

/**
 * Testing user register endpoint
 */
describe('# testing register at POST api/v1/user/register', () => {
  it('should be successful to register a user', (done) => {
    request
      .post('/api/v1/user/register')
      .send(testData)
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          return done(err);
        }
        const {
          data: { token, user },
        } = body;
        assert(!!token, 'should return token');
        assert(!!user, 'should return user');
        testData.id = user.id;
        done();
      });
  });

  it('should not be successful due to conflict of email addresses', (done) => {
    request.post('/api/v1/user/register').send(testData).expect(409, done);
  });
});

/**
 * Testing user login endpoint
 */
describe('# testing login at POST api/v1/user/login', () => {
  it('should login the user', (done) => {
    request
      .post('/api/v1/user/login')
      .send({
        email: testData.email,
        password: testData.password,
      })
      .expect(200)
      .end(async (err, { body }) => {
        if (err) {
          return done(err);
        }
        const {
          data: { token, user },
        } = body;
        assert(!!token, 'should return token');
        assert(!!user, 'should return user');
        assert(user.name === testData.name, 'logged username is not expected');
        testData.token = token;

        const userExists = await userService.isExisting(testData.email);

        assert(userExists, 'should be able to find the user from db');

        done();
      });
  });

  it('should not login the user because of non-existing email', (done) => {
    request
      .post('/api/v1/user/login')
      .send({
        email: 'dummyemail@gmail.com',
        password: testData.password,
      })
      .expect(401, done);
  });

  it('should not login the user because of wrong password', (done) => {
    request
      .post('/api/v1/user/login')
      .send({
        email: testData.email,
        password: 'dummypassword',
      })
      .expect(401, done);
  });

  it('should not login the user because of invalid password', (done) => {
    request
      .post('/api/v1/user/login')
      .send({
        email: testData.email,
        password: '1',
      })
      .expect(400, done);
  });
});

/**
 * Testing user get me endpoint
 */
describe('# testing get me at GET api/v1/user/me', () => {
  it('should return me', (done) => {
    request
      .get('/api/v1/user/me')
      .set({ Authorization: `Bearer ${testData.token}` })
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          return done(err);
        }
        assert(
          body.data.name === testData.name,
          'returned username should be same as testData name'
        );
        done();
      });
  });

  it('should not be able to get user due to invalid token', (done) => {
    request
      .get('/api/v1/user/me')
      .set({ Authorization: `Bearer dummytoken` })
      .expect(401, done);
  });
});

/**
 * Testing delete user endpoint
 */
describe('# testing login at DELETE api/v1/user', () => {
  it('should unregister a user', (done) => {
    request
      .delete('/api/v1/user')
      .set({ Authorization: `Bearer ${testData.token}` })
      .expect(200)
      .end(async (err) => {
        if (err) {
          return done(err);
        }
        const userExists = await userService.isExisting(testData.email);
        assert(!userExists, 'should not be able to find the user anymore');
        done();
      });
  });

  it('should not be able to unregister user due to invalid token', (done) => {
    request
      .delete('/api/v1/user')
      .set({ Authorization: `Bearer dummytoken` })
      .expect(401, done);
  });
});
