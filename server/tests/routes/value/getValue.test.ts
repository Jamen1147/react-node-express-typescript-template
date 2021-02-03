import app from '../../../src/app';
import supertest from 'supertest';
import assert from 'power-assert';

const request = supertest(app);

describe('# testing get value at GET api/v1/value', () => {
  it('should be successful and return a random number', (done) => {
    request
      .get('/api/v1/value')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert(res.body.ok === true, 'returned ok should be true');
        assert(
          typeof res.body.data.value === 'number',
          'value should be a number'
        );
        assert(res.body.data.value < 11, 'value should be less than 11');
        done();
      });
  });
});
