import React, {useState, useEffect} from  'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swAlertService from '../services/swAlert'; 
import PopupDetails from './PopupDetails';
import '../css/listado.css';
import { useNavigate } from 'react-router';
import ArrowIcon from '../assets/arrows.js';

function List(){

    const lists = {
        popular : "popular", 
        topRated : "top_rated",
        upcoming : "upcoming"}

    const [movies, setMovies] = useState([]);
    
    const [selectedList, setSelectedList] = useState(lists.popular);

    const [pages, setPages] = useState({
        page: 1,
        total_pages: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
 
        axios.get('https://api.themoviedb.org/3/movie/'+selectedList+'?api_key=9b8b5a71ed3f7d0620bf8ec5f58c0fca&language=es-ES&page='+pages.page)
                    .then(res => {

                       setMovies(res.data.results);

                       setPages({...pages, total_pages: res.data.total_pages}); 

                    })
                    .catch(error => {

                        swAlertService("Error al cargar los datos, intente más tarde");

                    })

    }, [selectedList, pages.page]);


    const passPage = () => {

        if(pages.page < pages.total_pages){

            setPages({...pages, page: pages.page+1});
            
            window.scrollTo({top: 0, behavior: 'smooth'})
        }

    }

    return( 
            <>
            {movies.length && <div className='container dflex pt-2 text-white fs-5'>
               
                <span   className='ms-1 pb-1 cursor' 
                        style={{'border-bottom': selectedList === "popular" ? 'solid 2px white' : 'solid 2px transparent'}}
                        onClick={() => setSelectedList(lists.popular)}>
                            Populares
                        </span>
                <span   className='ms-4 pb-1 cursor' 
                        style={{'border-bottom': selectedList === "top_rated" ? 'solid 2px white' : 'solid 2px transparent'}}
                        onClick={() => setSelectedList(lists.topRated)}
                        >Ranking</span>
                <span   className='ms-4 pb-1 cursor' 
                        style={{'border-bottom': selectedList === "upcoming" ? 'solid 2px white' : 'solid 2px transparent'}}
                        onClick={() => setSelectedList(lists.upcoming)}
                        >En cines</span>
           
            </div>}
            <div className='container d-flex flex-column h-100 w-100'>
                <div className='row mt-4 h-100'>
                    {movies.map((movie, idx) =>{

                        return (
                                <div className='col-6 col-xxl-2 col-lg-3 col-md-4 mb-4' key={idx} onClick={() => navigate("detail?movieID="+movie.id)}>
                                    <div className="card bg-black text-white border-0 text-center position-relative animation d-flex flex-column align-items-center">
                                        <div className='cardImg'>
                                        <div className='coverImg'></div>
                                        <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} className="img" alt="poster film"></img>
                                        </div>
                                        <PopupDetails mov={movie}/>
                                        <div>
                                            {movie.title}
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
                </div>

                { (pages && movies.length)  &&  <div className="text-white fs-5 d-flex flex-row-reverse">
                                <div className='d-flex justify-content-center align-items-center'>
                                    <span> { pages.page > 1 && <div className='p-1 bg-secondary fw-bolder rounded-circle me-2'>
                                                                                <ArrowIcon onClick={() => setPages({...pages, page : pages.page - 1})} width={30} height={30} fill="white" direction="left"/>
                                                                            </div>} 
                                    </span>
                                    <div className='p-2 rounded-pill bg-secondary'>
                                        <span>{pages.page} </span> de  
                                        <span> {pages.total_pages}</span>
                                    </div>
                                    <div onClick={passPage} className='p-1 bg-secondary fw-bolder rounded-circle ms-2'>
                                        <ArrowIcon width={30} height={30} fill="white" direction="right"/>
                                    </div>
                                </div>
                            </div>}
            </div>
            </>
    )


}



export default List;