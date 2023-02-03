import { useEffect, useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export interface LatAndLng {
  lat: number
  lng: number
}

export default function Location({
  disabled,
  latlng,
  onChange,
}: {
  disabled: boolean
  latlng: { lat: number; lng: number }
  onChange: (latlng: LatAndLng) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>()

  useEffect(() => {
    map?.setView?.(latlng, 10)
  }, [latlng, map])

  return (
    <div className="w-3/5 h-80">
      <MapContainer
        style={{
          borderRadius: '0.8rem',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
        }}
        ref={setMap}
        // scrollWheelZoom={false}
        center={latlng}
        zoom={10}
      >
        {!disabled && <UpdateLocation onChange={onChange} />}

        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <LocationMarker disabled={disabled} onChange={onChange} latlng={latlng} />
      </MapContainer>
    </div>
  )
}

function UpdateLocation({ onChange }: { onChange: (latlng: LatAndLng) => void }) {
  const map = useMapEvents({
    // click(e) {
    // map.locate()
    // },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationfound(e: any) {
      onChange?.(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  const handleCurrentLocation = () => {
    map.locate()
  }

  return (
    <button
      onClick={handleCurrentLocation}
      type="button"
      className="absolute right-1 btn btn-sm btn-primary top-1"
      style={{ zIndex: 999999 }}
    >
      <BiCurrentLocation className="mr-2" size={18} />
      Set Current Location
    </button>
  )
}

function LocationMarker({
  latlng,
  onChange,
  disabled,
}: {
  latlng: LatAndLng
  onChange: (latlng: LatAndLng) => void
  disabled: boolean
}) {
  // const [position, setPosition] = useState(latlng)

  const map = useMapEvents({
    click(e) {
      if (disabled) {
        return
      }
      onChange?.(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return latlng === null ? null : (
    <Marker position={latlng}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
