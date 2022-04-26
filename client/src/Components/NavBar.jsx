import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './SearchBar';
import navBar from '../Styles/navBar.css';

export default function NavBar(){
    return (
        <div className='backgroundNavBar'>
            <Link className='textNavBar' to='/Home'>Home</Link>
            <Link className='textNavBar' to='/videogame'>Crear un videojuego</Link>
            <Searchbar></Searchbar>
        </div>
    )
}