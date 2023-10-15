import React from 'react'

function Home({ user }) {
  if (user) {
    return (
    <>
      <h1>Welcome, {user.username}!</h1>
      <h2>Cars List</h2>
    </>
    )
  } else {
    return <h1>Please Login or Sign Up</h1>
  }
}

export default Home