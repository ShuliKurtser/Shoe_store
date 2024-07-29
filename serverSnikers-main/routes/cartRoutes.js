// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../data/cart.json'); 
const data = require('../data/cart.json');


router.get('/', (req, res) => {
    try {
      let carts = data.cart;
      return res.status(200).json(carts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error node get' });
    }
  });

router.post('/add', (req, res) => {
  try {
    const cartItem = req.body; 
    console.log(cartItem);
    fs.readFile(cartFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const cartItems = JSON.parse(data); 
      console.log(cartItems);
      cartItems.cart.push(cartItem);
      fs.writeFile(cartFilePath, JSON.stringify(cartItems), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }   
        res.status(201).json(cartItem);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete('/remove/:id', (req, res) => {
    try {
      const id = req.params.id; 
      console.log(id);
      fs.readFile(cartFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const cartItems = JSON.parse(data); 
        console.log(cartItems);
        let arrNew = cartItems.cart.filter(cart => cart.id != id);
        cartItems.cart = arrNew;
        fs.writeFile(cartFilePath, JSON.stringify(cartItems), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }   
          res.status(201).json("delete successfully"); 
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
