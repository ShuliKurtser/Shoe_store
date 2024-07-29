import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../context';


  const Card = ({
     id,
     title, 
     imageUrl, 
     price, 
     favorited,
     loading = false,
      onClickFavorite, 
      onClickPlus
     }) => {
    ;
  const { isItemAdded } = React.useContext(AppContext);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  const onPlus = () => {
    if (!isChecked) {
      onClickPlus(obj);
      setIsChecked(true);
    }
  };

  React.useEffect(() => {
    setIsChecked(isItemAdded(id));
  }, [id, isItemAdded]);

  React.useEffect(() => {
    if (isItemAdded(id) && !isChecked) {
      setIsChecked(true);
    }
  }, [isItemAdded, isChecked, id]);

 
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onClickFavorite(obj); 
  };
  
  return (
    <div className='card'>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
        </ContentLoader>
      ) : (
        <>
         <div className='favorite' onClick={onClickFavorite ? handleFavoriteClick : null}>
  {onClickFavorite && (
    <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Favorite" />
  )}
</div> 
          <img src={imageUrl} alt="Sneakers" />
          <p><b>{title}</b></p>
          <div className="divContent">
            <div>
              <span>price:</span><br />
              <b>${price}</b><br></br>
              
            </div>
            {onClickPlus && (
              <button className='button' onClick={onPlus}>
                <img width={21} height={21} src={isChecked ? "/img/btn-checked.svg" : "/img/plus.svg"} alt="Plus" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
