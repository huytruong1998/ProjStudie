import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './SingleProduct.css';

const SingleProduct = ({
    image,
    productid,
    brand,
    discount,
    price,
    name
}) => {
    return (
        <Link className='line-bottom' style={{ textDecoration: 'none' }} to={`/product/${productid}`}>
            <div className="product-popular-col">

                <div style={{ backgroundImage: `url(${image})`, backgroundColor: 'white' }} className="product-popular-col-img">
                    {discount === null ? null : discount === '0' ? null: <div className='discount-on-product'>
                        -{discount * 100}%
                            </div>}
                </div>
                <div className="product-description">
                    <span style={{ color: '#767676' }} onClick={() => this.setState({ filter: brand })}>{brand}</span>
                    <h6 style={{ color: 'black' }}><b>{name}</b> </h6>
                    {discount !== null ? (<span className='original-price'>{parseFloat(price).toFixed(2)} €</span>) : null}
                    {discount !== null ? (<span style={{ color: 'red' }} >{(parseFloat(price) * (1 - parseFloat(discount))).toFixed(2)} €</span>) : (<span style={{ color: 'black' }}>{parseFloat(price).toFixed(2)}€</span>)}
                    <br />
                </div>
            </div>
        </Link>
    );
};

SingleProduct.propTypes = {
    image: PropTypes.string.isRequired,
    productid: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    discount: PropTypes.string,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

SingleProduct.defaultProps = {
    type: 'text'
};

export default SingleProduct;
