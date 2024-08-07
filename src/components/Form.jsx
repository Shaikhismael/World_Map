// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from './Message'
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import { useCitiesContext } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const {mapLat, mapLng} = useUrlPosition()
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState()
  const [geoCodingError, setGeoCodingError] = useState("")
  const { createCity, loading } = useCitiesContext()
  const navigate = useNavigate()

  useEffect(()=>{
    async function fetchCity(){

      if (!mapLat && !mapLng) {return}

      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`)

        const data = await res.json()
        if (data.country) {
          throw new Error("That's not a city")
        }
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setGeoCodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    } 
    fetchCity()
  },[mapLat, mapLng])

  if (isLoadingGeocoding) {
    return <Spinner></Spinner>
  }

  if (!mapLat && !mapLng) {
    return <Message message="start by clicking on Map" />
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng},
    }
    await createCity(newCity)
    navigate('/app/cities')
  }

  return (
    <form className={`${styles.form}${loading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span> 
      </div>
      <div className={styles.row}>
        <label htmlFor="countryName">Country name</label>
        <input
          id="countryName"
          onChange={(e) => setCityName(e.target.value)}
          value={country}
        />
         <span className={styles.flag}>{emoji}</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        
        <DatePicker 
          id="date" 
          selected={date} 
          onChange={date => setDate(date)} 
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button type={'back'} onClick={(e)=>{
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
