import React from 'react'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import { useCitiesContext } from '../context/CitiesContext'

function CityList() {
    const {
      cities,
      isLoading
  } = useCitiesContext()
    if (isLoading) return <Spinner />

    if (!cities.length) return <Message message={'Add city by clicking on map'} />

  return (
    <ul className={styles.cityList}>
        {cities.map(city => (<CityItem city={city} key={city.id}/>))}
    </ul>
  )
}

export default CityList