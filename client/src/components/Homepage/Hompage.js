import React, { Component } from 'react';
import './Homepage.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getallProduct } from '../../action/products';
import clothes from '../img/clothes.png';
import accessories from '../img/accessories.png';
import _ from 'lodash';

import wintergear from '../img/wintergear.jpg';
class Homepage extends Component {

    componentDidMount() {
        this.props.getallProduct();
    }
    render() {
        const products = _.take(_.sortBy(this.props.product.products,(product)=>{
            return parseInt(product.sold) ;
        }).reverse(),4)
        let popularitem;

        popularitem = _.map(products, (product, index) => {
                return (
                    <Link key={index} className='line-bottom' style={{ textDecoration: 'none' }} to={`/product/${product.id}`}>
                        <div className="product-popular-col">

                            <div style={{ backgroundImage: `url(${product.image})`, backgroundColor: 'white' }} className="product-popular-col-img">
                                {product.discount !== null ? <div className='discount-on-product'>
                                    -{product.discount * 100}%
                            </div> : null}
                            </div>
                            <div className="product-description">
                                <span style={{ color: '#767676' }} onClick={() => this.setState({ filter: product.brand })}>{product.brand}</span>
                                <h6 style={{ color: 'black' }}><b>{product.name}</b> </h6>
                                {product.discount !== null ? (<span className='original-price'>{parseFloat(product.price).toFixed(2)} €</span>) : null}
                                {product.discount !== null ? (<span style={{ color: 'red' }} >{(parseFloat(product.price) * (1 - parseFloat(product.discount))).toFixed(2)} €</span>) : (<span style={{ color: 'black' }}>{parseFloat(product.price).toFixed(2)}€</span>)}
                                <br />
                            </div>
                        </div>
                    </Link>
                )
        })
        
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
                    <div className="popular-section">
                        <h2>CATEGORY</h2>
                    </div>

                    <div className="product-style-grid tagtext">
                        <Link  to={{ pathname: '/product', state: { type: 'clothes' } }} >
                        <div style={{ backgroundImage: `url(${clothes})` }} className="product-col">
                            <div className="tag">
                                CLOTHES 
                            </div>
                        </div>
                        </Link>
                        <Link  to={{ pathname: '/product', state: { type: 'accessories' } }}>
                        <div style={{ backgroundImage: `url(${accessories})` }} className="product-col">
                            <div className="tag">
                                ACCESSORIES
                            </div>
                        </div>
                        </Link>
                        <Link  to={{ pathname: '/product', state: { type: 'equipment' } }}>
                        <div style={{ backgroundImage: `url(${wintergear})` }} className="product-col">
                            <div className="tag">
                                EQUIPMENT
                            </div>
                        </div>
                        </Link>
                    </div>

                    <div className="popular-section">
                        <h2>BEST SELLER</h2>
                    </div>

                    <div className="popular-style-grid">
                        {popularitem}
                    </div>
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
)(Homepage);

