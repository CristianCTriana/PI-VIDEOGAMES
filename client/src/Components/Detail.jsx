import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../Actions";

export default function Detail(){
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetail);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id));
    },[]);

    return (
        <div>
            <h1>{videogame.name}</h1>
            <img src={videogame.background_image} width='200px' height='200px'/>
            <div>
                <h4>Genres:</h4>
                <ul>
                {videogame.genres?.map(el => {
                    return <li key={el.name}>
                            {el.name}
                        </li>
                    })}
                </ul>
            </div>
            {videogame.description}
            <h4>{videogame.released}</h4>
            <h4>{videogame.rating}</h4>
            <div>
                <h4>Platforms:</h4>
                <ul>
                {videogame.platforms?.map(el => {
                    return<li key={el.name}>
                            {el.name}
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}