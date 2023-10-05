import React, { useState } from 'react';
import style from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { getFurnituresByName, getAllFurnitures } from '../../components/redux/actions/Actions';

export default function SearchBar({ setSearch }) {
const [nameFurniture, setNameFurniture] = useState('');
const dispatch = useDispatch();

function handleChange(e) {
    setNameFurniture(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (nameFurniture) {
      dispatch(getFurnituresByName(nameFurniture));
      setSearch(nameFurniture);
      setNameFurniture('');
    }
  }
  function handleClickFurnitures(e){
    e.preventDefault();
    dispatch(getAllFurnitures())
    setSearch('');
  }


  return (
<form className={style.container} onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    id="name"
    placeholder="Find your favorite product"
    value={nameFurniture}
    onChange={handleChange}
  />
  <div className={style.buttonContainer}>
    <button type="submit" className={style.searchButton}>Search</button>
    <button type="button" onClick={handleClickFurnitures} className={style.allButton}>All</button>
  </div>
</form>

  )
}