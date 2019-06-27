import React, { Component } from 'react';
import './ProductPage.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getproduct, buyproduct, getallProduct, addtocart } from '../../action/products';
import {makeorder} from '../../action/order';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ProductItem extends Component {

    constructor() {
        super();
        this.state = {
            quantity: 1,
            openbuynow:false
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    AddCart(id,quantity){
        const cartData = {
            productid: id,
            quantity: quantity,
            price:  this.props.product.product[0].price,
            name: this.props.product.product[0].name,
            discount: this.props.product.product[0].discount,
            type: this.props.product.product[0].type,
            brand: this.props.product.product[0].brand,
            description: this.props.product.product[0].description,
            image: this.props.product.product[0].image,
            tag: this.props.product.product[0].tag,
            type: this.props.product.product[0].type
        }
        const cartget = this.props.cart.cart;
        let check = false;
        if (quantity >= this.props.product.product[0].stocks){
            console.log('There are not enough in stocks');
            
        }else{
            if (cartget !== null) {
                _.map(cartget, (item, index) => {
                    if (item.productid === id) {
                        item.quantity = parseInt(item.quantity) + parseInt(quantity);
                        check = true;
                    }
                })
                if (check === false) {
                    cartget.push(cartData);
                }

                this.props.addtocart(cartget)
            } else {
                const newItem = [];
                newItem.push(cartData);
                this.props.addtocart(newItem);

            }
        }
        
        
    }

    BuyItem(quantity,totalprice){
        const orderArray = { order: [] };
        let orderData;
        const buyData = {
            quantity: parseInt(quantity),
            price: parseInt(this.props.product.product[0].price),
            discount: this.props.product.product[0].discount,
            name: this.props.product.product[0].name,
            brand: this.props.product.product[0].brand,
            type: this.props.product.product[0].type,
            image: this.props.product.product[0].image,
            id: this.props.product.product[0].productid
        }

        var date = new Date().getDate();
        var month = new Date().getMonth();
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
        this.props.makeorder(orderData);
        this.props.getproduct(this.props.match.params.id);
        this.setState({ openbuynow: false })
    }

    handleClickOpen() {
        this.setState({ openbuynow: true })
    }

    handleClose() {
        this.setState({openbuynow:false})
    }

    componentDidUpdate(prevProps) {
        if (this.props.product.product !== null) {
            if (prevProps.product.product === this.props.product.product) {
                this.props.getproduct(this.props.match.params.id);
            }
        }

    }

    componentDidMount() {
        this.props.getproduct(this.props.match.params.id);
        this.props.getallProduct();
    }
    render() {
        let imageproduct, productbrand, showproductprice, productprice, productname, cartprice, shippingprice, productdesc,buyalert,buydeny;
        let stocknumber;

        const products = _.take(_.sortBy(this.props.product.products, (product) => {
            return parseInt(product.sold);
        }).reverse(), 4)
        let popularitem;

        popularitem = _.map(products, (product, index) => {
            return (
                <Link key={index} style={{ textDecoration: 'none' }} to={`/product/${product.id}`}>
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
        if (this.props.product.product === null) {
            imageproduct= <div><h1>Loading Image ...</h1></div>
        }else{
            imageproduct = <div style={{ backgroundImage: `url(${this.props.product.product[0].image})` }} className="product-image">
            </div>;
            productname = this.props.product.product[0].name;
            productdesc = this.props.product.product[0].description;
            productbrand = <a href="#">{this.props.product.product[0].brand}</a>;
            buyalert = <Dialog
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
                    <Button onClick={() => this.BuyItem(this.state.quantity, productprice)} color="primary" autoFocus>
                        Agree
                            </Button>
                </DialogActions>
            </Dialog>

            buydeny = <Dialog
                open={this.state.openbuynow}
                onClose={() => this.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"WARNING !!!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need to loged in to buy the item?
                        Please log in or sign in your account
                            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()} color="primary">
                        Cancel
                            </Button>
                    <Button color="primary" autoFocus><Link to='/login'>
                            Log In
                    </Link>
                            </Button>
                    <Button color="primary" autoFocus><Link to='/signup'>
                        Sign Up
                    </Link>
                            </Button>
                </DialogActions>
            </Dialog>

            if (this.props.product.product[0].discount !== null){
                productprice = this.props.product.product[0].price * (1- this.props.product.product[0].discount)
                showproductprice = <p><span className='original-price'>{parseFloat(this.props.product.product[0].price).toFixed(2)} €</span><span style={{color:'red'}}>{parseFloat(productprice).toFixed(2)} €</span></p>
            }else{
                productprice = this.props.product.product[0].price;
                showproductprice = <p>{parseFloat(productprice).toFixed(2)} €</p>
            }
            if (this.props.product.product[0].stocks >= 10){
                stocknumber = <p style={{color:'green'}}>In Stock</p>
            } else if (this.props.product.product[0].stocks < 10 && this.props.product.product[0].stocks >0){
                stocknumber = <p>{this.props.product.product[0].stocks} left in stocks</p>
            }

            if(this.state.quantity >=1){
                if (this.props.product.product[0].discount !== null){
                    cartprice = <h3 style={{color:"red"}}>{parseFloat(productprice * this.state.quantity).toFixed(2)} €</h3>
                }else{
                    cartprice = <h3 >{parseFloat(productprice * this.state.quantity).toFixed(2)} €</h3>
                }
            
            }else{
                cartprice = <p>Quanity is not valid</p>
            }
            shippingprice = <p>Shipping: ${parseFloat(productprice * this.state.quantity * 0.05).toFixed(2)} (5%)</p>
            
        }
        return (
            <div className='product-container'>
                <div style={{marginBottom:'100px'}} className='products-style-grid' >
                    {imageproduct}
                    <div className="product-detail">
                        <h2><b>{productname}</b> </h2>
                        <div className="brand">
                            by {productbrand}
                        </div>
                        <div className="Price">
                            {showproductprice}
                        </div>
                        <div className="description">
                            <h4>DESCRIPTION</h4>
                            <p>{productdesc}</p>
                        </div>
                        
                    </div>
                    <div className="cart-option">
                        {cartprice}
                        {shippingprice}
                        <p>This item don't ship in Finland</p>
                        {stocknumber}

                        <div className="quantity">
                            <label htmlFor="quantity" className="a-native-dropdown">Qty:</label>
                            <select id="lang" name='quantity' onChange={this.onChange} value={this.state.quantity}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">5</option>
                                <option value="5">6</option>
                            </select>
                        </div>

                        <div className='AddtoCart'>
                            <button className='AddCartbutton' onClick={() => this.AddCart(this.props.product.product[0].id, this.state.quantity)}>Add to cart</button>
                        </div>
                        
                        <div className='BuyNow'>
                            <button className='BuyButton' onClick = {()=>this.handleClickOpen()}>Buy Now</button>
                            {this.props.auth.isAuthenticated === true ? buyalert : buydeny}
                        </div>
                    </div>
                </div>

                <div className="popular-section">
                    <h2>BEST SELLER</h2>
                </div>

                <div className='popular-style-grid'>
                    {popularitem}
                </div>
            </div>


        );
    }
}


const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getproduct, buyproduct, addtocart,getallProduct,makeorder}
)(ProductItem);