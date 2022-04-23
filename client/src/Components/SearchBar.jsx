import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../Actions';

export default function Searchbar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getVideogameByName(name));
    }

    return(
        <div>
            <input onChange={event => handleInputChange(event)} type='text' placeholder='Buscar...'></input>
            <button onClick={event => handleSubmit(event)} type='submit'>Buscar</button>
        </div>
    )
}