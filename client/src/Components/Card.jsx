import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/card.css';

export default function Card({background_image, genres, name, id}){
    return (
        <Link className='cardContainer' to={'/videogame/'+id}>
            <img className='cardImg' src={background_image} alt=''/>
            <span className='nameCard'><strong>{name}</strong></span>
            <span className='cardGenres'>{genres.map(el => {
                return(
                    <p className='nameGenre'  key={el.name}>{el.name}</p>
                    )
                })}
            </span>
        </Link>
    );
}