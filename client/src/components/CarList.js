import React, { useState, useEffect } from 'react'
import CarCard from './CarCard'

function CarList({ user }) {
  const [cars, setCars] = useState([])

      // fetch all Cars GET
      useEffect(()=>{
        fetch('/cars')
          .then(r=>r.json())
          .then(car=>setCars(car))
      }, [])

  return (
    <div>
      {cars.map(car => (
        <CarCard user={user} key={car.id} id={car.id} make={car.make} model={car.model} vin={car.vin} miles={car.miles} year={car.year} image={car.image_url} price={car.price} engine={car.engine} />
        )
      )}   
    </div>
    )
}

export default CarList