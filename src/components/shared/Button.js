import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ children, location, variant, ...restProps }) => {
  return (
    <Link to={location} className={`button button__wrapper ${variant}`}>
      {children}
    </Link>
  )
}
