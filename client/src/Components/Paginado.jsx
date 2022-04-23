import React from 'react';

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul>
                {pageNumbers?.map(number => (
                    <li key={number}>
                        <h6 onClick={()=>{paginado(number)}}>{number}</h6>
                    </li>
                ))}
            </ul>
        </nav>
    )
};