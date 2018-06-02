import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => (

    <header>
        <Link to='/'>Главная</Link>
        <Link to='/survey'>Опрос</Link>
        <Link to='/chart'>Результаты</Link>
        <Link to='/method'>Методика</Link>
    </header>

);

export default Footer