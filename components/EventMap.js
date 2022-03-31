import MapGL, { Marker } from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Geocode from 'react-geocode'

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const [loading, setLoading] = useState(true)

  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    width: '500px',
    zoom: 12,
  })

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longitude: lng })
        setLoading(false)
      },
      (error) => {
        console.error(error)
      }
    )
  }, [])

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  if (loading) return false

  return (
    <MapGL
      style={{ width: '100%', height: '400px' }}
      mapStyle='mapbox://styles/mapbox/light-v9'
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={setViewport}
      {...viewport}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </MapGL>
  )
}
