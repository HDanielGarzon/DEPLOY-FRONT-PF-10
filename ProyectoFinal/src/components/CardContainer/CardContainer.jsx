import React, { useState } from 'react';
import style from './CardContainer.module.css';
import Card from '../Card/Card';
import Paginate from '../Paginate/Paginate';
import { useSelector } from 'react-redux';


const CardContainer = ({ allFurnitures }) => {
  const { numPage } = useSelector((state) => state);
  const furnitures = allFurnitures;
  const cantRecipesPage = 9;

  // estado local para controlar el orden por precio
  const [sortByPrice, setSortByPrice] = useState(false);

  let desde = (numPage - 1) * cantRecipesPage;
  let hasta = numPage * cantRecipesPage;

  // variable para almacenar el array de muebles ordenado por precio
  const sortedFurnitures = sortByPrice
    ? [...furnitures].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    : [...furnitures];

  let cantPage = Math.ceil(sortedFurnitures.length / cantRecipesPage);

  return (
    <div className={style.cardContainer}>
      {sortedFurnitures.slice(desde, hasta).map((furniture, index) => (
        <Card
          key={index}
          image={furniture.image}
          id={furniture.id}
          name={furniture.name}
          colors={furniture.colors}
          price={furniture.price}
          Categories={furniture.Categories}
        />
      ))}
      <div>
        <Paginate numPage={numPage} cantPage={cantPage} />
      </div>
    </div>
  );
};

export default CardContainer;
