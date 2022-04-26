import React from 'react';
import {Link} from 'react-router-dom';
import landing from '../Styles/Landing.css';

export default function landingPage(){
    return (
        <div className='background'>
            <h1 className='text'>Match Found</h1>
            <Link to='/home'>
                <button className='button'>Aceptar Partida</button>
            </Link>
        </div>
    )
}