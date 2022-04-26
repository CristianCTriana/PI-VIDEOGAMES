import React, { useEffect, useState} from "react";
import Select from 'react-select';
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, filterVideogameByGenre, getGenres, filterByOrigin, sortByName, sortByRating } from "../Actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from './Paginado';
import Searchbar from './SearchBar';
import home from '../Styles/Home.css';
import NavBar from "./NavBar";

export default function Home(){

    const colourStyles = {
        placeholder: (styles) =>({
            ...styles,
            color: '#0f1923',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: '#0f1923',
        }),
        control: (styles) => ({ ...styles, 
            backgroundColor: "#ff4655", 
            borderRadius: "15px 50px", 
            border: "2px solid #0f1923",
            fontFamily: 'Bebas Neue', 
            fontSize: '20px'}),
        option: (styles) => {
            return {
                ...styles,
                borderRadius: "15px 50px",
                marginTop: "5px",
                backgroundColor: "#345578",
            };
        },
        menuList: (styles) => ({
            ...styles,
            backgroundColor: 'transparent'
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: 'transparent'
        })
    };

    
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.allGenres);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [sorted, setSorted] = useState(''); 

    const indexOfLastVideogames = currentPage * videogamesPerPage;
    const indexOfFirstVideogames = indexOfLastVideogames - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogames, indexOfLastVideogames);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    },[]);

    function handleClick(event){
        event.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterGenres(event){
        dispatch(filterVideogameByGenre(event.value));
        setCurrentPage(1);
    }

    function handleFilterOrigin(event){
        dispatch(filterByOrigin(event.value));
        setCurrentPage(1);
    }

    function handleSortByName(event){
        dispatch(sortByName(event.value));
        setCurrentPage(1);
        setSorted('Ordenado ' + event.value);
    }

    function handleSortByRating(event){
        dispatch(sortByRating(event.value));
        setCurrentPage(1);
        setSorted('Ordenado ' + event.value);
    }

    const optionsName = [
        {value: 'a-z',label:'Ascendente'},
        {value: 'z-a',label: 'Descendente'}
    ];

    const optionsRating = [
        {value: 'ascendente',label:'Ascendente'},
        {value: 'descendente',label: 'Descendente'}
    ];

    let optionsGenres =[
        {value: 'All', label: "All"},
    ];
    genres.forEach(g => {
        optionsGenres.push({value: g.name, label: g.name});
    });


    const optionsOrigin = [
        {value:'All', label:'All'},
        {value:'Db', label:'Db'},
        {value:'Api', label:'Api'},
    ];
    
    return (
        <div className="backgroundHomeMain">   
            <NavBar></NavBar>
            {/* <button onClick={event => {handleClick(event)}}>
                volver a cargar todos los videogames
            </button> */}
            <div>
                <div className="filters">
                    <div className="orderItems">
                        <h1 className="filtrosText">Orden</h1>
                        {/* <Select className="prueba2" styles={colourStyles} onChange={event => {handleSortByName(event)}} options={optionsName} placeholder="Ordernar por nombre" ></Select> */}
                        <Select className="filterSelect" styles={colourStyles}  onChange={event => {handleSortByName(event)}} options={optionsName} placeholder="Ordernar por nombre" ></Select>
                        <Select className="filterSelect" styles={colourStyles} onChange={event => {handleSortByRating(event)}} options={optionsRating} placeholder="Ordenar por rating"></Select>
                    </div>
                    <div className="filterItems">
                        <h1 className="filtrosText">Filtrar</h1>
                        <Select className="filterSelect" styles={colourStyles}  name="filterByGenre" onChange={event => {handleFilterGenres(event)}} defaultValue={optionsGenres[0]} options={optionsGenres} placeholder="Ordenar por genero"></Select>
                        <Select className="filterSelect" styles={colourStyles}  name="filterByOrigin" onChange={event => {handleFilterOrigin(event)}} defaultValue={optionsOrigin[0]} options={optionsOrigin} placeholder="Ordenar por origen"></Select>
                    </div>
                </div>
                <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado}/>
                <div className="cardsContainer">{
                    currentVideogames?.map((e)=>{
                        return(
                            <Card background_image={e.background_image} genres={e.genres} name={e.name} id={e.id} key={e.id}></Card>
                        )
                    })
                }</div>
            </div>
        </div>
    )
}