import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Card/Card.module.css';


const Card = ({id, name, image, colors, price, Categories}) => {

const colorString = colors.join(', ');


  return (
    <div key={id} className={style.container}>
      <div className={style.header}></div>
      <div>
        <Link to={`/products/${id}`}>
          <img className={style.image} src={image} alt={name} />
        </Link>
      </div>
      <div className={style.name}>
        <h3>Name: {name}</h3>
        <h3>Colors: {colorString}</h3>
        <h3>Price: {`${price} usd`}</h3>
        <h3>Category: {Categories?.map((item) => item.name).join(', ')}</h3>
      </div>
    </div>
  );
};

export default Card;
