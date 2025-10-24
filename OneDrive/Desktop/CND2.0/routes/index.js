const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const Order = require('../models/Order');

// Home page with Order and Sell options
router.get('/', (req, res) => {
  res.render('index');
});

// Order flow
router.get('/order', async (req, res) => {
  const dishes = await Dish.find({ quantity: { $gt: 0 } });
  res.render('order', { dishes });
});

router.post('/order/:id', (req, res) => {
  const dishId = req.params.id;
  const quantity = req.body.quantity;
  res.redirect(`/address/${dishId}?quantity=${quantity}`);
});

router.get('/address/:id', (req, res) => {
  const dishId = req.params.id;
  const quantity = req.query.quantity;
  res.render('address', { dishId, quantity });
});

router.post('/address/:id', (req, res) => {
  const { address, quantity } = req.body;
  const dishId = req.params.id;
  res.redirect(`/payment/${dishId}?address=${encodeURIComponent(address)}&quantity=${quantity}`);
});

router.get('/payment/:id', async (req, res) => {
  const dishId = req.params.id;
  const address = req.query.address;
  const quantity = req.query.quantity;
  const dish = await Dish.findById(dishId);
  if (!dish || !address || !quantity) {
    return res.redirect('/order');
  }
  res.render('payment', { dish, address, quantity });
});

router.post('/payment/:id', async (req, res) => {
  const { buyer, address, quantity } = req.body;
  const dishId = req.params.id;
  const dish = await Dish.findById(dishId);
  const totalPrice = dish.price * parseInt(quantity);

  const order = new Order({
    dish: dishId,
    buyer,
    address,
    quantity: parseInt(quantity),
    totalPrice
  });

  await order.save();
  res.redirect('/order-success');
});

// Sell flow
router.get('/sell', (req, res) => {
  res.render('sell');
});

router.post('/sell', async (req, res) => {
  const { name, price, quantity, description, seller } = req.body;
  const dish = new Dish({
    name,
    price,
    quantity,
    description,
    seller
  });
  await dish.save();
  res.redirect('/sell-success');
});

// Success pages
router.get('/order-success', (req, res) => {
  res.render('order-success');
});

router.get('/sell-success', (req, res) => {
  res.render('sell-success');
});

module.exports = router;
