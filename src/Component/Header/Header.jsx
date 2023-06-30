import React from 'react'
import logo from "../10.webp"
import {Link} from "react-router-dom"
import {ImSearch} from "react-icons/im"
const Header = () => {
  return (
    <nav className='header'>
    <img src={logo} alt='logo'/>

    <div>
    <Link to="/tvshows">tvshows</Link>
    <Link to="/movies">Movies</Link>
    <Link to="/recently">Recently added</Link>
    <Link to="/mylist">myList</Link>
    </div>
    <ImSearch/>
    </nav>
  )
}

export default Header;