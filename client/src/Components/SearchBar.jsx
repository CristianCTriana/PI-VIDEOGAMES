import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogameByName } from '../Actions';
import searchbar from '../Styles/SearchBar.css';

export default function Searchbar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInputChange(event){
        event.preventDefault();
        setName(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        dispatch(getVideogameByName(name.toLowerCase()));
    }

    return(
        <div>
            <input className='searchBar' onChange={event => handleInputChange(event)} type='text' placeholder='Buscar...' autoComplete='off'></input>
            <button className='buttonSearchBar' onClick={event => handleSubmit(event)} type='submit'>🔍</button>
        </div>
    )
}