import React, { Component } from 'react';
import './NavBar.css';

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
                 <h1>ShopMe</h1>
            </div>
                <nav className={this.state.toggle ? 'active' : ''} >
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Product</a></li>
                        <li><a href="#">Offer</a></li>
                        <li><a href="#">Admin</a></li>
                        <li><a href="#"><i className="fas fa-search"></i></a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
            </nav>
                <div className={this.state.toggle ? 'menu-toggle menu-toggle-active' : 'menu-toggle'} onClick={this.onToggleMenu.bind(this)}><i className='fa fa-bars' aria-hidden='true'></i></div>
            </div>
            
        );
    }
}

export default NavBar;