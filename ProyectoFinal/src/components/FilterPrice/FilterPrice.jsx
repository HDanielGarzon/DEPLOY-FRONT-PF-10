import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice, getAllFurnitures } from '../redux/actions/Actions'; 
import style from './FilterPrice.module.css';

const FilterPrice = () => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    setMinPrice(newValue);
  };

  const handleMaxPriceChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    setMaxPrice(newValue);
  };

  const handleFilter = () => {
    // Despacho la acción filterByPrice con los valores minPrice y maxPrice
    dispatch(filterByPrice(minPrice, maxPrice));

    // Limpiar los campos de entrada después de la búsqueda
    setMinPrice('');
    setMaxPrice('');
  };

  function handleClickFurnitures(e){
    e.preventDefault();
    dispatch(getAllFurnitures())
    setSearch('');
  }


  return (
    <div className={style.filterPriceContainer}>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleClickFurnitures}>Reset</button>

    </div>
  );
};

export default FilterPrice;
