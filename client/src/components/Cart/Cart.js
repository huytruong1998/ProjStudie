import React, { Component } from 'react';
import './Cart.css';

import _ from 'lodash';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addtocart, buyproduct } from '../../action/products';
import { makeorder} from '../../action/order';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Cart extends Component {
    constructor(){
        super();
        this.state={
            checkstock: false,
            openbuynow:false
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
    
    handleClickOpen() {
        this.setState({ openbuynow: true })
    }

    handleClose() {
        this.setState({ openbuynow: false })
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
                totalprice: totalprice,
                email: this.props.auth.user.email
            }
            
            
        });
        this.props.makeorder(orderData);
        cartData.splice(0, cartData.length);
        this.props.addtocart(cartData);
        this.setState({ openbuynow: false })
    }
    
    render() {
        const cartData = this.props.cart.cart;
        let showCart,infodisplay;
        let totalprice = 0;

        if(cartData === null || cartData.length === 0){
            showCart = <h1>Nothing in the Cart</h1>
            totalprice = 0;
            infodisplay = <h2>Click <Link to='/product'>here</Link> to continue shopping</h2>
        }else{
            
            showCart = _.map(cartData,(product,index)=>{
                if (product.discount !== null){
                    totalprice = totalprice + ((parseFloat(product.price) * (1 -product.discount)) * parseInt(product.quantity));
                }else{
                    totalprice = totalprice + parseFloat(product.price * parseInt(product.quantity));
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
                            <a href="#" style={{ color: 'red' }} onClick={() => this.Removeproduct(product.productid)}><b>Remove</b></a>
                        </div>
                        <div className="priceqty">
                            <div className="proprice">
                                <h3 style={product.discount !== null ? { color: 'red' } : null}>{product.discount !== null ? parseFloat((parseFloat(product.price) * (1 - parseFloat(product.discount))).toFixed(2) * product.quantity ).toFixed(2)+ '€' : parseFloat(product.price * parseInt(product.quantity)).toFixed(2)  + '€' }</h3>
                            </div>
                            <div className="proquantity">
                                <button className='qtychange' onClick={() => this.Increase(product.productid)}>+</button>
                                <input className='inputqty' value={product.quantity} onChange={this.onChange} disabled/>
                                <button className='qtychange'  onClick={() =>this.Decrease(product.productid)}>-</button>
                                
                            </div>
                        </div>
                    </div>
                )
            });
            infodisplay = <div className='infodisplay'><h2>Total:{totalprice.toFixed(2)}€ </h2>
                <button className='checkout' onClick={() => this.handleClickOpen()}>Checkout</button>
                <Dialog
                    open={this.state.openbuynow}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"WARNING !!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to make this purchase ?
                            After purchase you can't refund the item.
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Disagree
                            </Button>
                        <Button onClick={() => this.BuyItem(totalprice)} color="primary" autoFocus>
                            Agree
                            </Button>
                    </DialogActions>
                </Dialog></div>
        }
       
        return <div className="cart-container">
            <h2>Shopping Cart</h2>
            {showCart}
            {infodisplay}
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