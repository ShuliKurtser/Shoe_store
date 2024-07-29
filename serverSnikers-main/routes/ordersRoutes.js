const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const orderFilePath = path.join(__dirname, '../data/orders.json'); 
const data = require('../data/orders.json');


router.get('/', (req, res) => {
    try {
      let orders = data.orders;
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error node get' });
    }
  });

  
router.post('/add', (req, res) => {
    try {
      const orderItem = req.body; 
      console.log(orderItem);
      
      fs.readFile(orderFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const orderItems = JSON.parse(data); 
        console.log(orderItems);
        orderItems.orders.push(orderItem);
  
    
        fs.writeFile(orderFilePath, JSON.stringify(orderItems), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }   
          res.status(201).json(orderItem);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  module.exports = router;