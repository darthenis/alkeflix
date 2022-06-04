import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import List from "./List";
import Detail from "./Detail.js";


function Home(){

    const token = sessionStorage.getItem('token');

    return(
        <>
        {!token && <Navigate to="/"/>}
        {token &&  <div className="container-fluid p-0 d-flex flex-column min-vh-100 justify-content-between bg-black">
                        <Header/>
                            <Routes>
                                <Route path="/" element={<List/>}/>
                                <Route path="/detail" element={<Detail/>}/>
                            </Routes>
                        <Footer/>
        </div>}
        </>
    )

}


export default Home;