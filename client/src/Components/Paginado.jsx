import React from 'react';
import paginado from '../Styles/paginado.css';

export default function Paginado({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='backgroundPaginado'>
            <ul className='paginado'>
                {pageNumbers?.map(number => (
                    <li className='itemPaginado' key={number}>
                        <button className='numberPage' onClick={()=>{paginado(number)}}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
};