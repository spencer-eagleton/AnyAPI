const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('AnyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create an item', async () => {
    const expected = {
      name: 'Burnside Toilet',
      type: 'toilet',
      coords: 420
    };
    const res = await request(app)
      .post('/api/v1/items')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

});
