import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/home';
import Favorites from './pages/favorites';
import AppContext from './context';
import Orders from './pages/orders';



function Main() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  
  
React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('http://localhost:3001/shoes');
        
        if (itemsResponse && itemsResponse.data) {
          setIsLoading(false);
          
          const updatedItems = itemsResponse.data.map((item) => ({
            ...item,
            isChecked: false 
          }));
          setItems(updatedItems);
        } else {
          throw new Error('Error fetching data: Unexpected response format');
        }
      } catch (error) {
        console.error('Error setting up the request:', error.message);
        alert(' Error setting up the request react fetch data: ' + error.message);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      const existingItem = cartItems.find((item) => Number(item.id) === Number(obj.id));
      if (existingItem) {
        axios.delete(`http://localhost:3001/cart/remove${existingItem.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('http://localhost:3001/cart/add', obj)
        .then((response) => {
            console.log(response.data);
            setCartItems((prev) => [...prev, response.data]);
          })
          .catch((error) => {
            console.error('error in onAddToCart   post:', error);
          });
      }
    } catch (error) {
      console.error('error add  item  tocart:', error);
      alert('error add  item to cart : ' + error.message);
    }
  };
  
  const onRemoveItem = async (id) => {
    try {
      const existingItem = cartItems.find((item) => Number(item.parentId) === Number(id));
      if (existingItem) {
        await axios.delete(`http://localhost:3001/cart/remove/${existingItem.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(id)));
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, isChecked: false } : item
          )
        );
      }
    } catch (error) {
      alert('error remove item from cart');
      console.error(error + 'error onRemoveItem');
    }
  };
 const onAddToFavorite = async (obj) => {
  try {
    const isFavorite = favorites.find(favobj => favobj.id === obj.id);
    if (isFavorite) {

      console.log('the item is in favorite');
      return;
    }
    await axios.post('http://localhost:3001/favorites/add', obj);
    setFavorites(prev => [...prev, obj]);
  } catch (error) {
    alert('error add item in favorites ');
    console.error(error);
  }
};

   const onRemoveFavorite = async (id) => {
    try {
      
      await axios.delete(`http://localhost:3001/favorites/remove/${id}`);
    
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('error remove item from favorite');
      console.error(error);
    }
  };
  
  const onChangeSearchInInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  return (
    < AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems,
       
    }}>
      <>

        <div className='wrapper content'>

          {cartOpened ?
           <Drawer 
          items={cartItems}
           onCloseX={() => setCartOpened(false)} 
           onRemove={onRemoveItem} /> : null}

          <Header onClickCard={() => setCartOpened(true)} />

        </div>


        <Routes>
        
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInInput={onChangeSearchInInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}
          />
          <Route path="/favorites" element={
            <Favorites items={favorites}
             onAddToFavorite={onAddToFavorite} 
             onRemoveFavorite={onRemoveFavorite}
             onAddToCart={onAddToCart} />}
          />
          <Route path="/orders" element={
            <Orders />}
          />
        </Routes>

      </>
    </AppContext.Provider>
  );
}

export default Main;
