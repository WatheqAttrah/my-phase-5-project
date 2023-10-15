import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import CarList from './CarList'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'
import NavBar from './NavBar'
import '../index.css'

function App() {
  const [user, setUser] = useState(null)

  // authentication
  useEffect(()=> {
    fetch('/check_session')
      .then(r=> {
        if (r.status === 200) {
        r.json().then(u=> setUser(u))
        }
      })
  }, [])

  return (
    <>
      <NavBar activeclassname="active" user={user} setUser={setUser} />
      <main>
        {user ? (   
          <Switch>
            <Route path="/">
              <Home user={user}/>
              <CarList user={user} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <Signup setUser={setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
      </main>
    </>
  )
}

export default App