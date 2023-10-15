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
        <CarCard user={user} key={car.id} id={car.id} make={car.make} model={car.model} price={car.price} />
        )
      )}   
    </div>
    )
}

export default CarList