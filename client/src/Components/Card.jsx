import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({background_image, genres, name, id}){
    return (
        <div>
            <h3><Link to={'/videogame/'+id}>{name}</Link></h3>
            {genres.map(el => {
                return <h5 key={el.name}>{el.name}</h5>
            })}
            <Link to={'/videogame/'+id}><img src={background_image} alt='' width='200px' height='200px' /></Link>
        </div>
    );
}