// routes/favoritesRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const favoritesFilePath = path.join(__dirname, '../data/favorites.json');
const data = require('../data/favorites.json');


router.get('/', (req, res) => {
    try {
      let favorites = data.favorites;
      return res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error node get' });
    }
  });

router.post('/add', (req, res) => {
  try {
    const favoritesItem = req.body; 
    console.log(favoritesItem);
    
    fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const favoritesItems = JSON.parse(data); 
      console.log(favoritesItems);
      favoritesItems.favorites.push(favoritesItem);

      
      fs.writeFile(favoritesFilePath, JSON.stringify(favoritesItems), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }   
        res.status(201).json(favoritesItem);
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
      fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal Server Error' });
          }

          let favoriteItems = JSON.parse(data);
          console.log(favoriteItems);
          favoriteItems.favorites = favoriteItems.favorites.filter(favorite => favorite.id !== id);

         
          fs.writeFile(favoritesFilePath, JSON.stringify(favoriteItems), (err) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Internal Server Error' });
              }
              res.status(200).json("delete successfully"); 
          });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

