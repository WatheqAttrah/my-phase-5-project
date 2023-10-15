import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar( { user, setUser }) {

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    });
  }

  /* Add basic styling for NavLinks */
  const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
  }

  return (
    <header>
      <div>
        {user ? (
            <NavLink to="/logout" exact style={linkStyles} activeStyle={{background: "darkblue"}} onClick={handleLogoutClick}>Logout</NavLink>
            
        ) : (
          <>
            <NavLink to="/" exact style={linkStyles} activeStyle={{background: "darkblue"}}>Home</NavLink>
            <NavLink to="/signup" exact style={linkStyles} activeStyle={{background: "darkblue"}}>SignUp</NavLink>
            <NavLink to="/login" exact style={linkStyles} activeStyle={{background: "darkblue"}}>Login</NavLink>

          </>
        )}
      </div>
    </header>
  )
}

export default NavBar