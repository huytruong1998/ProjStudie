import React, { Component } from 'react';
import './ProductPage.css';
import './../Homepage/Homepage.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getallProduct} from '../../action/products';
import _ from 'lodash';

class Product extends Component {

    constructor(){
        super();
        this.state = {
            filter:'all',
            currentPage:null,
            totalPage:null
        }
    }

    componentDidMount() {
        this.props.getallProduct();
    }
    showAll = () =>{
        this.setState({filter: 'all'})
    }
    showEquipment = () => {
        this.setState({ filter: 'equipment' })
    }

    showClothes = () => {
        this.setState({ filter: 'clothes' })
    }

    showAccessories = () => {
        this.setState({ filter: 'accessories' })
    }

    showSkateboard = () =>{
        this.setState({ filter: 'Skateboard' })
    }

    showSnowboard = () => {
        this.setState({ filter: 'Snowboard' })
    }

    showHat = () => {
        this.setState({ filter: 'Hat' })
    }

    showShoe = () => {
        this.setState({ filter: 'Shoe' })
    }

    showJacket = () => {
        this.setState({ filter: 'Jacket' })
    }

    showEarring = () => {
        this.setState({ filter: 'Earring' })
    }

    showNecklace = () => {
        this.setState({ filter: 'Necklace' })
    }

    showBag = () =>{
        this.setState({ filter: 'Bag' })
    }


    render() {
        
        const {products} = this.props.product;
        let displayproduct;
        if(products === null ){
            displayproduct = <h1>Nothing here</h1>
        }else{
            displayproduct = _.map(products,(product,index)=>{
                if(product.tag === this.state.filter || product.type === this.state.filter || this.state.filter ==='all'){
                    return (
                        <div key={index} className="product-popular-col">
                            <div style={{ backgroundImage: `url(${product.image})` }} className="product-popular-col-img">
                                <div className="popular-show-cart">
                                    <button><Link to={`/product/${product.id}`}>VIEW DETAIL</Link></button> 
                                </div>
                            </div>
                            <div className="product-description">
                                <a>{product.brand}</a>
                                <h6><b>{product.name}</b> </h6>
                                {product.discount !== null ? (<span className='original-price'>${parseFloat(product.price).toFixed(2)}</span>): null }
                                {product.discount !== null ? (<span>${(parseFloat(product.price) * (1- parseFloat(product.discount))).toFixed(2)}</span>) : (<span>${parseFloat(product.price).toFixed(2)}</span>)}
                                 <br />

                            </div>
                        </div>
                    )
                }
                    
                
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
                            <li ><a href="#" onClick={this.showAll}>All products</a></li>
                            <li ><a href="#" onClick={this.showEquipment}>Sport's Equipment</a>
                                    <ul>
                                    <li><a href="#" onClick={this.showSkateboard}>Skateboard</a> </li>
                                    <li ><a href="#" onClick={this.showSnowboard}>Snowboard</a> </li>
                                    </ul>
                                </li>
                            <li ><a href="#" onClick={this.showClothes}>Clothing</a>
                                    <ul>
                                    <li><a href="#" onClick={this.showHat}>Hat</a> </li>
                                    <li ><a href="#" onClick={this.showShoe}>Shoe</a> </li>
                                    <li ><a href="#" onClick={this.showJacket}>Jacket</a> </li>
                                    </ul>
                                </li>
                            <li ><a href="#" onClick={this.showAccessories}>Accessories</a>
                                    <ul>
                                    <li ><a href="#" onClick={this.showEarring}>Earring</a> </li>
                                    <li ><a href="#" onClick={this.showNecklace}>Necklace</a> </li>
                                    <li ><a href="#" onClick={this.showBag}>Bag</a> </li>
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
                        <div className="products-style-grid">{displayproduct}</div>
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

