import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { postVideogame, getGenres} from '../Actions/index';
import {useDispatch, useSelector} from "react-redux";
import NavBar from './NavBar';
import '../Styles/videogameCreate.css';


export default function VideogameCreate(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.allGenres);

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0.00,
        background_image: '',
        genres: [],
        platforms: [],
        createdInDb: true
    });

    const [errors, setErrors] = useState({});

    function validations(input){
        let errors = {};
        if(!input.name){
            errors.name = "El nombre no puede estar vacio";
        } 
        if(!input.description){
            errors.description = "Debes ingresar una descripcion";
        }
        if(!(input.platforms.length > 0)){
            errors.platforms = "Debes añadir minimo una plataforma";
        }
        if(input.rating > 5 || input.rating < 0){
            errors.rating = "El rating debe estar entre 0 y 5";
        }

        return errors;
    }

    function handleChange(event){
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setErrors(validations({
            ...input,
            [event.target.name]: event.target.value
        }));
    }

    function handleCheckGenre(event){
        if(event.target.checked){
            setInput({
                ...input,
                genres: [...input.genres, event.target.value]
            })
        }else{
            setInput({
                ...input,
                genres: input.genres.filter(el => el !== event.target.value)
            })
        }
        if(event.target.checked){
            setErrors(validations({
                ...input,
                genres: [...input.genres, event.target.value]
            }));
        }else{
            setErrors(validations({
                ...input,
                genres: input.genres.filter(el => el !== event.target.value)
            }));
        }
    }

    function handleCheckplatform(event){
        if(event.target.checked){
            setInput({
                ...input,
                platforms: [...input.platforms,{name: event.target.value}]
            })
        }else{
            setInput({
                ...input,
                platforms: input.platforms.filter(el => el.name !== event.target.value)
            })
        }
        if(event.target.checked){
            setErrors(validations({
                ...input,
                platforms: input.platforms.filter(el => el.name !== event.target.value)
            }));
        }else{
            setErrors(validations({
                ...input,
                platforms: input.platforms.filter(el => el.name !== event.target.value)
            }));
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        if(Object.keys(errors).length < 1){
            dispatch(postVideogame(input));
            setInput({
                name: '',
                description: '',
                released: '',
                rating: '',
                background_image: '',
                genres: [],
                platforms: '',
                createdInDb: true
            });
            navigate('/home');
        }
    }

    useEffect(()=>{
        dispatch(getGenres());
    },[]);

    return (
        <div className='backgroundForm'>
        <NavBar></NavBar>
            <h1 className='titleForm'>Crear tu Videojuego</h1>
            <form>
                <div>
                    <label className='labelForm'>Name</label>
                    <input className='inputTextForm' autoComplete='off' required onChange={event => {handleChange(event)}} type='text' value={input.name} name='name'></input>
                    {errors.name? <p className='errors'>{errors.name}</p>:<br/>}
                </div>
                <div>
                    <label className='labelForm titlePlatfom'>Platforms</label>
                    <table className='table1'>
                        <tr>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Xbox One' value='Xbox One'></input>
                                Xbox One</label>                                
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Xbox Series S/X' value='Xbox Series S/X'></input>
                                Xbox Series S/X</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Xbox 360' value='Xbox 360'></input>
                                Xbox 360</label>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='PlayStation 3' value='PlayStation 3'></input>
                                PlayStation 3</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='PlayStation 4' value='PlayStation 4'></input>
                                PlayStation 4</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='PlayStation 5' value='PlayStation 5'></input>
                                PlayStation 5</label>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='PC' value='PC'></input>
                                PC</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Nintendo Switch' value='Nintendo Switch'></input>
                                Nintendo Switch</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Linux' value='Linux'></input>
                                Linux</label>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='macOS' value='macOS'></input>
                                macOS</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='iOS' value='iOS'></input>
                                iOS</label>
                            </td>
                            <td className='tdTable1'>
                                <label>
                                <input onChange={event => handleCheckplatform(event)} type='checkbox' name='Android' value='Android'></input>
                                Android</label>
                            </td>
                        </tr>
                    </table>
                    {errors.platforms? <p className='errors'>{errors.platforms}</p>:<br/>}
                </div>
                <div>
                    <label className='labelForm'>Description </label>
                    <textarea className='inputTextForm textarea' required onChange={event => {handleChange(event)}} type='text' value={input.description} rows="10" cols="40" name='description'></textarea>
                    {errors.description? <p className='errors'>{errors.description}</p>:<br/>}
                </div>
                <div>
                    <label className='labelForm'>Released: </label>
                    <input className='inputTextForm' onChange={event => {handleChange(event)}} type='date' value={input.released} name='released'></input>
                    
                </div>
                <div>
                    <label className='labelForm'>Rating: </label>
                    <input className='inputTextForm' onChange={event => {handleChange(event)}} type='number' value={input.rating} name='rating' min="0" max="5" step="0.01"></input>
                    {errors.rating? <p className='errors'>{errors.rating}</p>:<br/>}
                </div>
                <div>
                    <label className='labelForm'>Background_image </label>
                    <input className='inputTextForm' onChange={event => {handleChange(event)}} type='text' value={input.background_image} name='background_image'></input>
                </div>
                <div>
                    <label className='labelForm'>Genres</label>
                    <div className='genresTable'>
                        {genres.map(g => {
                            return (
                                <label key={g.id}>
                                    <input onChange={event => handleCheckGenre(event)} type='checkbox' name={g.name} value={g.name}></input>
                                    {g.name}
                                </label>
                            )
                        })}
                    </div>
                </div>
                <button className='buttonEnviar' onClick={event => handleSubmit(event)} type='submit'>Crear</button>
            </form>
        </div>
    )
}