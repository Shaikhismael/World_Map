import React from 'react'
import styles from './AppNav.module.css'
import { NavLink } from 'react-router-dom'
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink  className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "active" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          } to='cities'>cities</NavLink>
        </li>
        <li>
          <NavLink to='countries'>countries</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav