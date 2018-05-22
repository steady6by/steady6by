import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => (


  <header>
      <Link to='/'>Главная</Link>
      <Link to='/survey'>Опрос</Link>
      <Link to='/chart'>Результаты</Link>
  </header>

);

export default Header