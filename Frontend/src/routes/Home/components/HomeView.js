import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { Link } from 'react-router'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <Link to='/notes'>
      <h1>Notes</h1>
    </Link>
    <img
      src={DuckImage} />
  </div>
)

export default HomeView
