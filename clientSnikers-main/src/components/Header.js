
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>

      <Link to='/'>
        <div className='d-flex'>
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 >Sneaker store</h3>
          </div>
        </div>
      </Link>

      <ul >
        <li onClick={props.onClickCard} >
          <img width={18} height={18} src="img/cart.svg" alt="drawer" />
          <span>${totalPrice}</span>
        </li>
        <li >
          <Link to="/favorites">
            <img width={18} height={18} src="img/heart.svg" alt="favorites" />
          </Link>

        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>

  );
}
export default Header;