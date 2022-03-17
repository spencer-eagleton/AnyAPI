const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', async (req, res) => {
    const item = await Item.insert(req.body);
    res.json(item);
  })

  .get('/', async (req, res) => {
    const items = await Item.findAll();
    res.json(items);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const item = await Item.findById(req.params.id);
      res.send(item);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const op = await Item.updateById(req.params.id, req.body);
    res.send(op);
  });
