import React, {useEffect, useState} from "react";
import axios from "axios";
import swAlertService from "../services/swAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import PopupDetails from "./PopupDetails";

import '../css/detail.css'


function Detail(){

    const [movie, setMovie] = useState(null);

    const [cast, setCast] = useState({
        cast: [],
        director: ""
    });

    const [similarMovies, setSimilarMovies] = useState(null);

    let query = new URLSearchParams(window.location.search);

    let movieId = query.get("movieID");

    useEffect(() => {
        
        axios.get("https://api.themoviedb.org/3/movie/"+movieId+"?api_key=9b8b5a71ed3f7d0620bf8ec5f58c0fca&language=es-ES")
                    .then(res => {

                        setMovie(res.data);

                        console.log(res.data)

                    }
                    ).catch(error => {

                        swAlertService("Error al cargar los datos, intente más tarde");

                    })

        axios.get("https://api.themoviedb.org/3/movie/"+movieId+"/similar?api_key=9b8b5a71ed3f7d0620bf8ec5f58c0fca&language=es-ES&page=1")
                    .then(res => {

                        setSimilarMovies(res.data.results);

                        console.log(res.data.results)

                    })
                    .catch(error => {

                        swAlertService("Error al cargar recomendaciones");

                    })

                    window.scrollTo({
                        left: 0,
                        top: 0,
                        behavior: 'auto', // <-- The scrolling happens in a single jump
                      });

        axios.get("https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key=9b8b5a71ed3f7d0620bf8ec5f58c0fca&language=es-ES")
                    .then(res => {

                        setCast({...cast, director: res.data.crew.find(crew => crew.job === "Director").name, cast: res.data.cast.slice(0, 5)});
                    })
                    .catch(error => {

                        swAlertService("Error al cargar los datos del casting");

                    })

    }, [movieId]);

    const changeFormatDate = (date) => {

        let dateFormat = new Date(date);

        let day = dateFormat.getDate();
        let month = dateFormat.getMonth() + 1;
        let year = dateFormat.getFullYear();

        return day + "/" + month + "/" + year;

    }

    const getSimilar = () => {

        let arrayRecommend = [];

        for(let i = 0; i < 6; i++){

                arrayRecommend.push(similarMovies[i]);
            }

        return arrayRecommend;

    }

    return( 
            <>
            { movie && <div className="container text-white py-3">
                            <div className="w-100 mb-4 text-center fs-5">{movie.tagline}</div>
                            <div className="row">
                                <img className="col-12 col-sm-4 h-50" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                                <div className="col">
                                    <h1>{movie.title}</h1>
                                    <h5 className="m-0">Sinopsis:</h5>
                                    <p>{movie.overview}</p>
                                    <ul className="p-0">
                                    <li><span className="fw-bold">Director</span>: {cast.director}</li>
                                    <li><span className="fw-bold">Casting</span>: {cast.cast.map(c => c.name).join(", ")}</li>
                                    <li><span className="fw-bold">Fecha de estreno</span>: {changeFormatDate(movie.release_date)}</li>
                                    <li><span className="fw-bold">Duración</span>: {movie.runtime} minutos</li>
                                    <li><span className="fw-bold">Género</span>: {movie.genres.map(genre => genre.name).join(", ")}</li>
                                    <li><span className="fw-bold">Valoración</span>: {movie.vote_average}/10 ({movie.vote_count} votos)</li>
                                    </ul>
                                     <a href={movie.homepage} target="_blank" rel="noopener noreferrer" role="button" data-bs-toggle="button" className="btn btn-light p-1 text-black">Web</a>            
                                     <a href={"https://www.imdb.com/title/"+movie.imdb_id}><FontAwesomeIcon className="iconImdb btn fs-1 text-warning border-0" icon={faImdb} /></a>
                                </div>
                                <h3 className="mt-4">Relacionadas</h3>
                                {similarMovies && getSimilar().map((mov, idx)=>{
                                    return(
                                    <div className='col-6 col-xxl-2 col-lg-3 col-md-4 mb-4' key={idx} onClick={() => window.location.replace("http://localhost:3000/home/detail?movieID="+mov.id)}>
                                    <div className="card bg-black text-white border-0 text-center position-relative animation d-flex flex-column align-items-center">
                                        <div className='cardImg'>
                                        <div className='coverImg'></div>
                                        <img src={"https://image.tmdb.org/t/p/w500"+mov.poster_path} className="img" alt="poster film"></img>
                                        </div>
                                        <PopupDetails mov={mov}/>
                                        <div>
                                            {mov.title}
                                        </div>
                                    </div>
                                </div>)
                                })}
                            </div>
                            </div>}
                
            </>
    )


}


export default Detail;