import React, { Component } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

class NavBar extends Component {
    constructor(){
        super();
        this.state={
            toggle:false
        }
    }


    onToggleMenu(){
        this.setState({toggle:!this.state.toggle})
    }
    render() {
        return (
            <div className="NavBarContent">
            <div className='ShopName'>
                    <h1><b>ShopMe</b> </h1>
            </div>
                <nav className={this.state.toggle ? 'active' : ''} >
                    <ul>
                        <li><b><Link to="/">Home</Link></b> </li>
                        <li><b><a href="#">Product</a></b> </li>
                        <li><b><a href="#">Offer</a></b></li>
                        <li><b><a href="#">Admin</a></b></li>
                        <li><b><a href="#"><i className="fas fa-search"></i></a></b></li>
                        <li><b><Link to="/login">Login</Link></b> </li>
                    </ul>
            </nav>
                <div className={this.state.toggle ? 'menu-toggle menu-toggle-active' : 'menu-toggle'} onClick={this.onToggleMenu.bind(this)}><i className='fa fa-bars' aria-hidden='true'></i></div>
            </div>
            
        );
    }
}

export default NavBar;