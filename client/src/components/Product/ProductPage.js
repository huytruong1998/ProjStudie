import React, { Component } from 'react';
import './ProductPage.css';
import './../Homepage/Homepage.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getallProduct} from '../../action/products';
import _ from 'lodash';

import wintergear from '../img/wintergear.jpg';
class Product extends Component {

    componentDidMount() {
        this.props.getallProduct();
    }

    render() {
        const {products} = this.props.product;
        let displayproduct;
        if(products === null ){
            displayproduct = <h1>Nothing here</h1>
        }else{
            displayproduct =_.map(products,(product)=>{
                return(
                    <div className="product-popular-col">
                        <div style={{ backgroundImage: `url(${product.image})` }} className="product-popular-col-img">
                            <div className="popular-show-cart">
                                <button>VIEW DETAIL</button>
                            </div>
                        </div>
                        <div className="product-description">
                            <a>{product.brand}</a>
                            <h6><b>{product.name}</b> </h6>
                            <span className='original-price'>$90.00</span><span>${parseFloat(product.price).toFixed(2) }</span> <br />

                        </div>
                    </div>
                )
            })
        }
        
        return (
            <div className='product-container row'>          
                    <div className="filter-bar ">
                    <div className="title-head-product">
                        <h5><b>Shop by category</b></h5>
                    </div>
                        <div className="category">
                            <ul>
                            <li><a href="#">Show All Product</a></li>
                                <li><a href="#">Sport's Equipment</a>
                                    <ul>
                                    <li><a href="#">Skateboard</a> </li>
                                    <li><a href="#">Snowboard</a> </li>
                                    </ul>
                                </li>
                                <li><a href="#">Clothing</a>
                                    <ul>
                                    <li><a href="">Hat</a> </li>
                                    <li><a href="">Shoe</a> </li>
                                    <li><a href="">Jacket</a> </li>
                                    </ul>
                                </li>
                                <li><a href="#">Accessories</a>
                                    <ul>
                                    <li><a href="">Earring</a> </li>
                                    <li><a href="">Necklace</a> </li>
                                    <li><a href="">Bag</a> </li>
                                    </ul>
                                </li>
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
                        <div className="product-style-grid">{displayproduct}</div>
                </div>  
            </div>
        );
    }
}


const mapStateToProps = state => ({
    product: state.product
});

export default connect(
    mapStateToProps,
    { getallProduct }
)(Product);

