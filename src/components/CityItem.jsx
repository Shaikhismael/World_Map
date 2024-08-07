import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCitiesContext } from '../context/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
}).format(new Date(date));

function CityItem({city}) {
  const { currentCity,getCurrentCity,deleteCity } = useCitiesContext()
    const {cityName, emoji, date, id, position} = city

    function handleClick(e) {
      e.preventDefault()
      deleteCity(id)
    }

  return (
    <li >
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`} onClick={()=>getCurrentCity(id)}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li> 
  )
}

export default CityItem