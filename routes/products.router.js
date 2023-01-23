const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema');
const ProductsService = require('../services/product.service');


const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req, res , next) => {
  try {
  const { id } = req.params;
  const products = await service.findOne(id);
  res.json(products);
  } catch(error) {
  next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const product = await service.create(body)
  res.status(201).json(product)
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
  const { id } = req.params;
  const body = req.body;
  const rta = await service.update(id, body)
  res.json(rta)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta)
})

module.exports = router;
