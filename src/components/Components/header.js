import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./header.css"

function Header(){
    const[nav,setnav] = useState(false); 

    const changeBackground = () => {
        if(window.scrollY >= 50){
            setnav(true);
        }
        else{
            setnav(false);
        }
    }
    window.addEventListener('scroll',changeBackground);

    return(
        
        <nav className={nav ? 'nav active' : 'nav'}>
            <a href="/" className='logo'>
                Home Page
            </a>
            <label className='menu-icon' for='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <dl className=' menu'>
                <dd><Link to='/myCars'>My Cars</Link></dd>
                <dd><Link to='/Trade'>Trade</Link></dd>
            </dl>
        </nav>
    )
}

export default Header;