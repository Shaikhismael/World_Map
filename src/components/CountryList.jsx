import React from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Message from './Message'
import Spinner from './Spinner'
import { useCitiesContext } from '../context/CitiesContext'

function CountryList() {  
  const {
    cities,
    isLoading
} = useCitiesContext()

  if (isLoading) return <Spinner />
  
  if (!cities.length) return <Message message={'Add country by clicking on map'} />

  const countries = cities.reduce((arr, city)=> 
  {
    if (!arr.map(el => el.country).includes(city.country)) {
      return [...arr, {country: city.country, emoji: city.emoji}]
    } else {
      return arr
    }
  }, [])

  console.log(countries)

  return (
    <ul className={styles.countryList}>
        {countries.map(country => (<CountryItem country={country} key={country.id}/>))}
    </ul>
  )
}

export default CountryList