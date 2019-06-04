import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './SingleProduct.css';

const SingleProduct = ({
    index,
    image,
    id,
    brand,
    discount,
    price,
    name
}) => {
    return (
        <div key={index} className="product-popular-col">
            <div style={{ backgroundImage: `url(${image})` }} className="product-popular-col-img">
                <div className="popular-show-cart">
                    <button><Link to={`/product/${id}`}>VIEW DETAIL</Link></button>
                </div>
            </div>
            <div className="product-description">
                <a>{brand}</a>
                <h6><b>{name}</b> </h6>
                {discount !== null ? (<span className='original-price'>${parseFloat(price).toFixed(2)}</span>) : null}
                {discount !== null ? (<span>${(parseFloat(price) * (1 - parseFloat(discount))).toFixed(2)}</span>) : (<span>${parseFloat(price).toFixed(2)}</span>)}
                <br />

            </div>
        </div>
    );
};

SingleProduct.propTypes = {
    index: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    discount: PropTypes.string,
    price: PropTypes.string.isRequired,
    name: PropTypes.func.isRequired
};

SingleProduct.defaultProps = {
    type: 'text'
};

export default SingleProduct;
