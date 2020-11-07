import React from 'react'
import { Redirect } from 'react-router-dom'

export const Card = ({ children, location, background, ...restProps }) => {
  return (
    <div onClick={location && (<Redirect push to={location}/>)} {...restProps} className={`card__container ${background}`}>
      {children}
    </div>
  )
}

Card.Image = function CardImage ({ children, source, ...restProps }) {
  return (
    <div className='cardImage__wrapper'>
      <img src={source} alt='cardImage' className='card__image' />
    </div>
  )
}

Card.Content = function CardContent ({ children, ...restProps }) {
  return <div className='card__content'>{children}</div>
}

Card.Title = function CardTitle ({ children, ...restProps }) {
  return <h3 className='card__title'>{children}</h3>
}

Card.Body = function CardBody ({ children, ...restProps }) {
  return <p className='card__body'>{children}</p>
}

// Card.Button = function CardButton ({ children, location, ...restProps }) {
//   return 
// }
