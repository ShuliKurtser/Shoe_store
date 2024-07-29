import React from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import Info from './info';

function Drawer({items = [], onCloseX, onRemove}) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3001/orders/add', {
        items: cartItems,
      });
      const orderId = data.id; 
      setOrderId(orderId);
      setIsOrderComplete(true);
      setCartItems([]);
  
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('http://localhost:3001/cart/remove/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert(error + 'Error creating order :(');
    }
    setIsLoading(false);
  };
  

  return (
    <div className='overlay'>
      <div className='drawer'>
        <p>
          <img onClick={onCloseX} className='removeBtn' src='/img/btn-remove.svg' alt='btn-remove' />
        </p>

        {items.length > 0 ? (
          <div>
            <div className='Items'>
              {items.map((obj) => (
                <div className='cartItem' key={obj.id}>
                  <img width={70} height={70} src={obj.imageUrl} alt='snikers' />
                  <div className='mr-20'>
                    <p>{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)}
                   className='removeBtn' 
                   src='img/btn-remove.svg' 
                   alt='button remove' />
                </div>
              ))}
            </div>
            <div className='totalBlock'>
              <span>total price:---------------------</span>
              <b>${totalPrice}</b>
              <br></br>
              <span>tax 5%:-------------------</span>
              <b>${(totalPrice/100*5).toFixed(2)}</b>
              <button
              disabled={isLoading}
               onClick={onClickOrder}
                className='greenButton'>
                Place order
                <img src='img/arrow1.svg'
                 alt='arrow'></img>
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Order is processed!' : 'Cart is empty'}
            description={
              isOrderComplete
                ? `Your order will soon be transferred to courier delivery`
                : 'Add at least one pair of sneakers to complete your order.'
            }
            image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          />
         
        )}
      </div>
    </div>
  );
}
export default Drawer;

