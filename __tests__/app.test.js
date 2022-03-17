const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Item = require('../lib/models/Item');

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

  it('gets a list of items', async () => {
    const expected = await Item.findAll();
    const res = await request(app).get('/api/v1/items');

    expect(res.body).toEqual(expected);
  });

  it('gets an item by its id', async () => {
    const item = {
      name: 'Burnside Toilet',
      type: 'toilet',
      coords: 420
    };
    const expected = await Item.insert(item);
    const res = await request(app).get(`/api/v1/items/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for dog not found', async () => {
    const res = await request(app).get('/api/v1/items/fake-item');

    expect(res.status).toEqual(404);
  });

  it('updates item fetched by Id', async () => {
   
    const initial = {
      name: 'Burnside Toilet',
      type: 'toilet',
      coords: 420
    };

    const item = await Item.insert(initial);


    const res = await request(app).patch(`/api/v1/items/${item.id}`).send({ coords : 500 });
    const expected = {
    
      id: expect.any(String),
      name: 'Burnside Toilet',
      type: 'toilet',
      coords: 500,
    };
    

    expect(res.body).toEqual(expected);
    
  });

  it('deletes an item', async () => {
    const initial = {
      name: 'Burnside Toilet',
      type: 'toilets',
      coords: 420
    };

    const item = await Item.insert(initial);


    const res = await request(app).delete(`/api/v1/items/${item.id}`);
    expect(res.body).toEqual(item);
  });

});
