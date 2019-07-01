import React, { Component } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser} from '../../action/authActions';

class NavBar extends Component {
    constructor(){
        super();
        this.state={
            toggle:false
        }
    }

    logoutUser(){
        this.props.logoutUser();
    }

    onToggleMenu(){
        this.setState({toggle:!this.state.toggle});
   
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
                        <li><b><Link to="/product">Product</Link></b></li>
                        {this.props.auth.user.role === 'admin' ? (<li><b><Link to="/admin">Admin</Link></b></li>):null}
                        <li><b><Link to='/cart'><i className="fas fa-shopping-cart"></i></Link></b></li>
                        <li><b><a href="#"><i className="fas fa-search"></i></a></b>
                        </li>
                        {this.props.auth.isAuthenticated ? (<li><b><a href="#"><i className="fas fa-user"></i></a></b>
                            <ul>
                                <li><Link to={`/profile/${this.props.auth.user.id}`}>Profile</Link></li>
                                <li onClick={this.logoutUser.bind(this)} ><a href="#">Logout</a></li>
                            </ul>
                        </li>) : (<li><b><Link to="/login">Login</Link></b> </li>)}
                        
                        
                    </ul>
            </nav>
                <div className={this.state.toggle ? 'menu-toggle menu-toggle-active' : 'menu-toggle'} onClick={this.onToggleMenu.bind(this)}><i className='fa fa-bars' aria-hidden='true'></i></div>
            </div>
            
        );
    }
}


NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    {logoutUser}
)(NavBar);
