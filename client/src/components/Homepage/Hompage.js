import React, { Component } from 'react';
import './Homepage.css';
import { Link } from "react-router-dom";

import clothes from '../img/clothes.png';
import accessories from '../img/accessories.png';

import wintergear from '../img/wintergear.jpg';
class Homepage extends Component {
    render() {
        return (
            <div>
                <div className='section'>
                    <div className="box-trans">
                        <h1>GEAR UP FOR WINTER</h1>
                        <p className='discount'>up to 20% off </p>
                        <p>winter eqipement, clothes </p>
                        <button>SHOP NOW</button>
                    </div>
                </div>


                <div className="item-section">
                    <div className="product-style-grid">
                        <div style={{ backgroundImage: `url(${clothes})` }} className="product-col">
                            <div className="tag">
                                <Link to={{pathname: '/',state:{type: clothes}}} >CLOTHES</Link>
                            </div>
                        </div>
                        <div style={{ backgroundImage: `url(${accessories})` }} className="product-col">
                            <div className="tag">
                                <Link to='/'>ACCESSORIES</Link>
                            </div>
                        </div>
                        <div style={{ backgroundImage: `url(${wintergear})` }} className="product-col">
                            <div className="tag">
                                <Link to='/'>EQUIPMENT</Link>
                            </div>
                        </div>
                    </div>

                    <div className="popular-section">
                        <h2>Popular Products</h2>
                    </div>

                    <div className="popular-style-grid">
                    <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${clothes})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br/>

                            </div>
                    </div>
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${clothes})` }} className="product-popular-col-img">
                                <div className='discount-on-product'>
                                    -20%
                            </div>
                                <div className="popular-show-cart">

                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span>
                            </div>
                        </div>
                        
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${clothes})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span>
                            </div>
                        </div>
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${clothes})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;