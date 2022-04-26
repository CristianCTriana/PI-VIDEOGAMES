import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../Actions";
import NavBar from "./NavBar";
import '../Styles/detail.css';

export default function Detail(){
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogameDetail);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDetail(id));
    },[]);

    let letter = videogame.name?.charAt(0).toUpperCase();
    let showName = videogame.name?.slice(1);
    
    return (
        <div>    
            <NavBar></NavBar>
            <div className="detailContainer">
                <img className="imgDetail" alt="reference to game" src={videogame.background_image}/>
                <div className="nameDetail">
                    <h1>{letter + showName}</h1>
                    {videogame.description?.split('<p>').join(' ').split('</p>').join(' ').split('<br />').join('\n')}
                </div>
                <div className="dataDetail">
                    <table className="tableData">
                        <tr className="tableRowData1">
                            <td className="cellData">
                                Rating
                            </td>
                            <td className="cellData">
                                ({videogame.rating})
                            </td>                                
                        </tr>
                        <tr className="tableRowData2">
                            <td className="cellData">
                                Genres
                            </td>
                            <td className="cellData">
                                {videogame.genres?.map(el => {
                                    return <span key={el.name}>
                                        {" - "+el.name+" "} 
                                    </span>
                                })}
                            </td>
                        </tr>
                        <tr className="tableRowData1">
                            <td className="cellData">
                                released
                            </td>
                            <td className="cellData">
                                {videogame.released}
                            </td>
                        </tr>
                        <tr className="tableRowData2">
                            <td className="cellData">
                                Platforms
                            </td>
                            <td className="cellData">
                                {videogame.platforms?.map(el => {
                                    return<span key={el.name}>
                                        {" - "+el.name+" "} 
                                    </span>
                                })}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}