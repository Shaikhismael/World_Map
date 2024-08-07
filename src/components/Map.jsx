import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCitiesContext } from '../context/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'


function ChangeCenter({position}) {
  const map = useMap()  
  map.setView(position)
  return null
}

function DetectClick(){
  const navigate = useNavigate()
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

function Map() {
  const {cities} = useCitiesContext()
  const [mapPosition,setMapPosition] = useState([40, 0])
  // const [searchParams, setSearchParams] = useSearchParams()
  const {isLoading: isLoadingPositon, position: geoPosition, getPosition} = useGeolocation()

  const {mapLat, mapLng} = useUrlPosition()

  useEffect(()=>{
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
    else console.log("entered Map")
  },[mapLat, mapLng])

  useEffect(()=>{
    if (geoPosition) {
      setMapPosition([geoPosition.lat, geoPosition.lng])
    }
    else console.log("first")
  },[geoPosition])

  return (

    <div className={styles.mapContainer}>
     { !geoPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPositon ? "loading..." : "your location"}
      </Button>}
      <MapContainer 
        center={mapPosition}
        zoom={6} 
        scrollWheelZoom={true}
        className={styles.map}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {cities?.map((city) => (
        <Marker key={city.id} position={[city?.position?.lat,city?.position?.lng]}>
        <Popup>
         <span>{city.cityName}</span>
        </Popup>
      </Marker>))}
      <ChangeCenter position={mapPosition} />
      <DetectClick/>
    </MapContainer>
    </div>
  )
}

export default Map