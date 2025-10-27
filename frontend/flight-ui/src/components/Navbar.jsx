import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../assets/PolarisLogo.png'
import { useUser } from "../Context/UserContext";


function Navbar() {

     const {user} = useUser();


    return(<>
    
        <nav className="navbar">
            <img className="logo" src={logo} alt="logo" />

            <ul className="navbar-links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/searchpanel'>Search Panel</Link></li>
                <li><Link to='/about'>About</Link></li>

                
                {user ? (<li><Link to='/dashboard'>Dashboard</Link></li>) : (<li><Link to='/login'>Login</Link></li>)}

                {!user && <li><Link to='/signup'>SignUp</Link></li>}
                

            </ul>
        </nav>
    
        </>)


}

export default Navbar;