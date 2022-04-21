import React, { useEffect, useState} from "react";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import { getVideogames } from "../Actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from './Paginado'

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);

    const indexOfLastVideogames = currentPage * videogamesPerPage;
    const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogames, indexOfLastVideogames);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getVideogames());
    },[]);

    function handleClick(event){
        event.preventDefault();
        dispatch(getVideogames());
    }

    const optionsName = [
        {value: 'ascendente',label:'Ascendente'},
        {value: 'descendente',label: 'Descendente'}
    ];

    const optionsRating = [
        {value: 'ascendente',label:'Ascendente'},
        {value: 'descendente',label: 'Descendente'}
    ];

    const optionsGenres =[
        {value: 'Action', label:'Action'},
        {value: 'Adventure', label:'Adventure'},
        {value: 'RPG', label:'RPG'},
        {value: 'Shooter', label:'Shooter'},
        {value: 'Puzzle', label:'Puzzle'},
        {value: 'Indie', label:'Indie'},
        {value: 'Platformer', label:'Platformer'},
        {value: 'Massively Multiplayer', label:'Massively Multiplayer'},
        {value: 'Sports', label:'Sports'},
        {value: 'Racing', label:'Racing'},
        {value: 'Simulation', label:'Simulation'},
        {value: 'Arcade', label:'Arcade'},
        {value: 'Strategy', label:'Strategy'},
        {value: 'Fighting', label:'Fighting'},
        {value: 'Casual', label:'Casual'},
        {value: 'Family', label:'Family'}
    ];

    const optionsOrigin = [
        {value:'todos', label:'Todos'},
        {value:'db', label:'Db'},
        {value:'api', label:'Api'},
    ];
    
    return (
        <div>
            <Link to='/videogame'>Crear un videojuego</Link>
            <h1>Home de videogames</h1>
            <button onClick={event => {handleClick(event)}}>
                volver a cargar todos los videogames
            </button>
            <div>
                <Select options={optionsName} placeholder="Ordernar por nombre" ></Select>
                <Select options={optionsRating} placeholder="Ordenar por rating"></Select>
                <Select options={optionsGenres} placeholder="Ordenar por genero"></Select>
                <Select options={optionsOrigin} placeholder="Ordenar por origen"></Select>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>
                {
                    currentVideogames?.map((e)=>{
                        return(
                            <Card background_image={e.background_image} genres={e.genres} name={e.name} id={e.id} key={e.id}></Card>
                        )
                    })
                }
            </div>
        </div>
    )
}