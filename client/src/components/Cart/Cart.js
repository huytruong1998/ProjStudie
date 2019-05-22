import React, { Component } from 'react';
import './Cart.css';
import clothes from '../img/clothes.png';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addtocart, buyproduct } from '../../action/products';

class Cart extends Component {
    constructor(){
        super();
        this.state={
            checkstock: false
        }
    }
    Increase(id){
        const cartData = this.props.cart.cart;
        _.map(cartData, (item) => {
            if(item.productid === id){
                item.quantity = parseInt(item.quantity) + 1;
            }
        });
        this.props.addtocart(cartData);
        
    }

    Decrease(id){
        const cartData = this.props.cart.cart;
        _.map(cartData, (item) => {
            if (item.productid === id && parseInt(item.quantity) >1 ) {
                item.quantity = parseInt(item.quantity) - 1;
            }
        });
        this.props.addtocart(cartData);

    }

    Removeproduct(id){
        const cartData = this.props.cart.cart;
        _.map(cartData, (item,index) => {
            if (item.productid === id) {
                cartData.splice(index, index+1);
            }
        });
        this.props.addtocart(cartData);
    }

    BuyItem(){
        const cartData = this.props.cart.cart;

        _.map(cartData, (item,index) => {
             const buyData = {
                quantity: parseInt(item.quantity),
                productid: item.productid,
            }
            this.props.buyproduct(buyData);
            
            console.log(item);
            
        });
        cartData.splice(0, cartData.length);
        this.props.addtocart(cartData);
    }
    
    render() {
        const cartData = this.props.cart.cart;
        let showCart;
        let totalprice = 0;
        if(cartData === null){
            showCart = <h1>Nothing in the Cart</h1>
            totalprice = 0;

        }else{
            showCart = _.map(cartData,(product,index)=>{
                if (product.discount !== null){
                    totalprice = totalprice + ((parseInt(product.price) * (1 -product.discount)) * parseInt(product.quantity));
                }else{
                    totalprice = totalprice + (parseInt(product.price) * parseInt(product.quantity));
                }                  
                return (
                    <div className="item-container" key={index}>
                        <div className="productimg">
                            <img src={product.image} width='150px' />
                        </div>
                        <div className="description">
                            <h4>{product.name}</h4>
                            <p>{product.brand}</p>
                            <p>{product.description}</p>
                        </div>
                        <div className="priceqty">
                            <div className="proprice">
                                <h3>{product.discount !== null ? '$' + ((product.price * (1 - product.discount)) * product.quantity).toFixed(2) : '$' + product.price.toFixed(2)}</h3>
                            </div>
                            <div className="proquantity">
                                <p>{product.quantity}</p>
                                <button onClick={()=> this.Increase(product.productid)}>+</button>
                                <button onClick={() =>this.Decrease(product.productid)}>-</button>
                                <button onClick={() => this.Removeproduct(product.productid)}>Remove</button>
                            </div>
                        </div>
                    </div>
                )
            });
        }
       
        return <div className="cart-container">
            <h2>Shopping Cart</h2>
            {showCart}
            <h2>Total:${totalprice.toFixed(2)} </h2>
            <button onClick={() => this.BuyItem()}>Checkout</button>
        </div>
    }
}



const mapStateToProps = state => ({
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { addtocart,buyproduct }
)(Cart);