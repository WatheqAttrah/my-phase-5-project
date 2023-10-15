import React, { useState } from 'react'

function AddReview({ carId, onAddReview, user, onAppendReview }) {
  const [showForm, setShowForm] = useState(false)
  const [reviewText, setReviewText] = useState('')

  const closeForm = () => {
    setShowForm(false)
    setReviewText('')
    }
    
  //add a review to specific car reviews
  const handleSubmitReview = () => {
      if (reviewText.trim() === '') {
          alert('Please enter a review.')
          return
      }
      // data object
      const reviewData = {user_id: user.id, car_id: carId, review_text: reviewText}

      fetch(`/cars/${carId}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(reviewData),
      })
      .then(r=> r.json())
      .then((rev)=> {
        onAddReview(rev) 
        setReviewText('') //clear form
        setShowForm(false) //close form
        onAppendReview(rev) // append review to reviews
      })
      .catch((error) => console.error('Error adding review:', error))
  }

  return (
    <div>
      <button onClick={()=> setShowForm(true)}>Add Review</button>
      {showForm && (
        <div>
          <textarea rows='4' cols='50' value={reviewText} onChange={e=> setReviewText(e.target.value)} placeholder='Enter your review'/>
          <button onClick={handleSubmitReview}>Submit</button>
          <button onClick={closeForm}>Cancel</button>
        </div>  
      )}
    </div>
  )
}

export default AddReview