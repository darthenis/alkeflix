import React from "react";
import { genres } from "../assets/genres";

    const cutText = (text) => {

        if(text.length > 150){

            return text.substring(0, 150) + '[...]';

        }else{

            return text;

        }

    }

    const getYear = (date) => {

        return date.substring(0, 4);

    }

    const getGenres = (ids) => {

        let thisGenres = [];

        ids.forEach(id => {

            thisGenres.push(genres.find(genre => genre.id === id).name.es);

        });

        return thisGenres.join(', ');

    }

    function PopupDetails(props) {


    return (
        <>
        {props.mov.title && <div className="p-2 position-absolute animationCard">
            <ul className="p-0">
                <li className="fw-bolder fs-6">{props.mov.title}</li>
                <li>
                <span className="text-warning me-2">
                    {props.mov.vote_average.toFixed(1)}/10
                </span>
                {getYear(props.mov.release_date)}
                </li>
                <li>{cutText(props.mov.overview)}</li>
                <li>
                <span className="fw-bolder">Géneros:</span> {getGenres(props.mov.genre_ids)}
                </li>
            </ul>
            </div>}
        </>
        
    );
}


export default PopupDetails;