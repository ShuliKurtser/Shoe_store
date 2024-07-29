import React from 'react';

import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>

      item.title && item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => ( 
      <Card
        key={index}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        onClickPlus={onAddToCart}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className='content'>
      <div className='content1'>
        <h1>{searchValue ? `search by query: "${searchValue}"` : 'all sneakers'}</h1>

        <div className='search-block '>
          <img src="/img/search.svg" alt="Search" />
          {searchValue &&(
            <img
              onClick={() => setSearchValue('')}
              className='Clear'
              src="img/btn-remove.svg"
              alt="clear" />)}
          <input onChange={onChangeSearchInInput} value={searchValue} type="text" placeholder='Search...' />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;

