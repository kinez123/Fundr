import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; 


function Navbar(){
    return(
       <div>
       <nav>
                <h1><Link to="/">Fundr</Link></h1>
                <ul>
                    <li><Link to= '/listings'>Browse Projects </Link></li>
                    <li><Link to = '/wizard'>Start your Campaigns</Link></li>
                    <li><Link to='/support'>How it works</Link></li>
                    <li><Link to='/about'>About us</Link></li>
                    
                </ul>
                <button><Link to="/profile">User Profile</Link></button>
                <button><Link to="/campaign-analytics">Campaign Dashboard</Link></button>
                <button><Link to="/login">Login</Link></button>
            </nav>
        </div>
    );
}

export default Navbar;