import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';


function Favorites({ onAddToFavorite, onAddToCart, onRemoveFavorite }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/favorites')
            .then(response => {

                setItems(response.data);
            })
            .catch(error => {
                console.error('Error when getting favorites:', error);
            });
    }, []); 
    const handleRemoveFavorite = async (itemId) => {
        try {
          await axios.delete(`http://localhost:3001/favorites/remove/${itemId}`);
          setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          onRemoveFavorite(itemId); 
        } catch (error) {
          console.error('error remove item from favorites:', error);
          alert('error remove item from favorites');
        }
      };
    return (
        <div className='content'>
            <div className='content1'>
                <h1>My favorites</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {items.map((objItem, index) => (
                 <Card
                 key={index}
                 id={objItem.id}
                 item={objItem}
                 type={objItem.type}
                 title={objItem.title}
                 price={objItem.price}
                 imageUrl={objItem.imageUrl}
                 favorited={true}
                 onClickFavorite={() => handleRemoveFavorite(objItem.id)} 
                 onClickPlus={onAddToCart}
               />
               
                ))}
            </div>
        </div>
    );
}

export default Favorites;
