import React, { Component } from 'react';
import './Homepage.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getallProduct } from '../../action/products';
import clothes from '../img/clothes.png';
import accessories from '../img/accessories.png';
import _ from 'lodash';
import SingleProduct from '../common/SingleProduct';

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
                    <SingleProduct key={index} image={product.image} productid={product.id} brand={product.brand} discount={product.discount} price={product.price} name={product.name} />
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
                {/* <div className='offer-section'>
                    <div className='offer-click'>

                    </div>
                    <div className='offer-click'>

                    </div>
                </div> */}


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

