import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='header__wrapper'>
      <button className='header__menu' />
      <Link to='/profile' className='header__avatar'>
        <img src='/images/avatar.png' alt='avatar' />
      </Link>
    </div>
  )
}
