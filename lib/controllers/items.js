const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', async (req, res) => {
    const item = await Item.insert(req.body);
    res.send(item);
  });
