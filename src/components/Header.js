import React from 'react';
import {Link} from 'react-router-dom';


function Header(){


        return(
            <header>
                    <nav className='navbar navbar-expand bg-dark bg-gradient'>
                        <div className='container'>
                            <span className='navbar-brand text-white fs-3'>
                                <span className="text-danger">A</span>lkeflix
                            </span>
                                <ul className='navbar-nav'>
                                    <li className='nav-item'>
                                        <Link className='nav-link active text-white' to={"/home"}>Home</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link active text-white' to={"/home/listado"}>Listado</Link>
                                    </li>
                                </ul>
                        </div>
                    </nav>
            </header>
        )

}



export default Header;