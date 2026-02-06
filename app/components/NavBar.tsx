import React, {Component} from 'react';
import {Link} from "react-router";

class NavBar extends Component {
    render() {
        return (
             <nav className="navbar">
                 <Link className="navbar-brand" to="/">
                     <p className="text-2xl font-bold text-gradient">RESUMIND</p>
                 </Link>
                 <Link to="/upload" className="primary-button w-fit">
                     <p>UploadResume</p>
                 </Link>
             </nav>
        );
    }
}

export default NavBar;