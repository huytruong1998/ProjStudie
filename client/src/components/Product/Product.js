import React, { Component } from 'react';
import './Product.css';
import './../Homepage/Homepage.css';
import { Link } from "react-router-dom";

import wintergear from '../img/wintergear.jpg';
class Product extends Component {
    render() {
        return (
            <div className='product-container row'>          
                    <div className="filter-bar ">
                    <div className="title-head-product">
                        <h5><b>Shop by category</b></h5>
                    </div>
                        <div className="category">
                            <ul>
                                <li><a href="#">Sport's Equipment</a>
                                    <ul>
                                    <li><a href="">Skateboard</a> </li>
                                    </ul>
                                </li>
                                <li><a href="#">Clothing</a> </li>
                                <li><a href="#">Accessories</a> </li>
                            </ul>
                        </div>

                    <div className="title-head-product">
                        <h5><b>Brand</b></h5>
                    </div>
                    <div className="category">
                        <ul>
                            <li><input type="checkbox" /> <a href="#">Zara</a> </li>
                            <li><input type="checkbox" /><a href="#">The North Face</a> </li>
                            <li><input type="checkbox" /><a href="#">H&M</a> </li>
                        </ul>
                    </div>
                    </div>
                    <div className="product-bar ">
                        <div className="product-style-grid">
                            <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                            </div>
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>
                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>


                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>

                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>

                        <div className="product-popular-col">
                            <div style={{ backgroundImage: `url(${wintergear})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button>VIEW DETAIL</button>
                                </div>
                            </div>
                            <div className="product-description">
                                <a>The North Face</a>
                                <h6><b>Warm Coat, Egypt</b> </h6>
                                <span className='original-price'>$90.00</span><span>$70.00</span> <br />

                            </div>
                        </div>
                        </div>
                </div>  
            </div>
        );
    }
}

export default Product;