import React, { useState } from 'react'
import AddReview from './AddReview'
import '../index.css'

function CarCard( {make, model, year, price, id, user , vin , miles} ) {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false)

  // get reviews for specific car
  function handleCarReviews() {
    fetch(`/cars/${id}`)
      .then(r=> r.json())
      .then(c=> {return (setReviews(c.reviews), setShowReviews(true))}
    )
  } 

  function handleAddReview(newReview){
    setReviews([...reviews, newReview])
  }

  const toggleReviews = () => {
    if (showReviews) {
      setShowReviews(false)
    } else {
      setShowReviews(true)
      handleCarReviews()
    }
  }

  const cardClassName = `card ${showReviews ? 'highlighted-card' : ''}`

  return (
    <div className={cardClassName}>
      <p>Make: <b>{make}</b></p>
      <p>Model: <b>{model}</b></p>
      <p>Price: <b>{price}</b></p>
      <p>VIN: <b>{vin}</b></p>
      <p>Miles: <b>{miles}</b></p>
      <p>Year: <b>{year}</b></p>
      <p>Price: <b>{price}</b></p>
      
      <button onClick={toggleReviews}>{showReviews ? 'Hide Reviews' : 'Show Reviews'}</button>

      {showReviews && (
        <>
          <h4>Reviews:</h4>

          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>{review.review} <small><i>Added by user: {review.user}</i></small></li> 
              ))}
            </ul>
            ) : (
              <p>No reviews available for this car.</p>
              )}
          <AddReview user={user} carId={id} onAddReview={handleAddReview} onAppendReview={handleCarReviews} />
        </>
      )}
    </div>
  )
}

export default CarCard