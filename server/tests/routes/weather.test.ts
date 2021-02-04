import app from '../../src/app';
import supertest from 'supertest';
import assert from 'power-assert';

const request = supertest(app);

describe('# testing get value at GET api/v1/weather', () => {
  it("should be successful and return a today's weather", (done) => {
    request
      .get('/api/v1/weather')
      .expect(200)
      .end((err, { body }) => {
        if (err) {
          return done(err);
        }
        assert(body.ok === true, 'returned ok should be true');
        assert(body.data.today === 'cloudy', 'today should be cloudy');
        done();
      });
  });
});
