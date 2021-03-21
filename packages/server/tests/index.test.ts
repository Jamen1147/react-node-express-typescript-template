import app from '../src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('testing app', () => {
  it('should return 404', (done) => {
    request.get('/api').expect(404, done);
  });
});
