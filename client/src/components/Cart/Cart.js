import React, { Component } from 'react';
import './Cart.css';

import _ from 'lodash';
import { connect } from 'react-redux';
import { addtocart, buyproduct } from '../../action/products';
import { makeorder} from '../../action/order';
import color from '@material-ui/core/colors/deepPurple';

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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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

    BuyItem(totalprice){
        const cartData = this.props.cart.cart;
        let orderData;
        const orderArray ={order:[]};
        _.map(cartData, (item,index) => {
             const buyData = {
                quantity: parseInt(item.quantity),
                price: item.price,
                discount: item.discount,
                name: item.name,
                brand: item.brand,
                type: item.type,
                image:item.image,
                id: item.productid
            }
            var date = new Date().getDate();
            var month = (new Date().getMonth() +1);
            var hours = new Date().getHours();
            var min = new Date().getMinutes();
            var sec = new Date().getSeconds();
            var year = new Date().getFullYear();
            orderArray.order.push(buyData);
            
            orderData = {
                startdate: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
                item: orderArray,
                status: 'new',
                userid: this.props.auth.user.id,
                totalprice: totalprice
            }
            
            
        });
        this.props.makeorder(orderData);
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
                            <img src={product.image} width='150px' alt='' />
                        </div>
                        <div className="description-cart">
                            <h4>{product.name}</h4>
                            <p>{product.brand}</p>
                            <p>{product.discount !== null ? <span className='original-price'>{product.price.toFixed(2)}€</span>:null } <span style={product.discount !==null ? {color:'red'}:null}>{(product.price*(1-product.discount)).toFixed(2)}€</span> </p>
                            <button onClick={() => this.Removeproduct(product.productid)}>Remove</button>
                        </div>
                        <div className="priceqty">
                            <div className="proprice">
                                <h3 style={product.discount !== null ? { color: 'red' } : null}>{product.discount !== null ? ((parseInt(product.price) * (1 - product.discount)) * parseInt(product.quantity)).toFixed(2) + '€' : parseInt(product.price * product.quantity).toFixed(2) + '€' }</h3>
                            </div>
                            <div className="proquantity">
                                <button className='qtychange' onClick={() => this.Increase(product.productid)}>+</button>
                                <input className='inputqty' value={product.quantity} onChange={this.onChange}/>
                                <button className='qtychange' onClick={() =>this.Decrease(product.productid)}>-</button>
                                
                            </div>
                        </div>
                    </div>
                )
            });
        }
       
        return <div className="cart-container">
            <h2>Shopping Cart</h2>
            {showCart}
            <h2>Total:{totalprice.toFixed(2)}€ </h2>
            <button onClick={() => this.BuyItem(totalprice)}>Checkout</button>
        </div>
    }
}



const mapStateToProps = state => ({
    cart: state.cart,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addtocart, buyproduct, makeorder }
)(Cart);