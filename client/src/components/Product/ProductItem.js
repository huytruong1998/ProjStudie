import React, { Component } from 'react';
import './ProductPage.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getproduct, buyproduct, addtocart } from '../../action/products';
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
            quantity: 1
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
            price: this.props.product.product[0].price,
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
        if (cartget!== null ){
            _.map(cartget,(item,index)=>{
                if(item.productid === id){
                    item.quantity = parseInt(item.quantity) + parseInt(quantity);
                    check = true;
                }
            })
            if (check === false){
                cartget.push(cartData);
            }
            
            this.props.addtocart(cartget)
        }else{
            const newItem = [];
            newItem.push(cartData);
            this.props.addtocart(newItem);
            
        }
        
    }

    BuyItem(quantity){
        const buyData={
            quantity:parseInt(quantity),
            productid: this.props.match.params.id,
        }

        this.props.buyproduct(buyData);
        this.props.getproduct(this.props.match.params.id);
    }



    componentDidMount() {
        this.props.getproduct(this.props.match.params.id);
    }
    render() {
        let imageproduct, productbrand, showproductprice, productprice, productname, cartprice, shippingprice, productdesc;
        let stocknumber;
        if (this.props.product.product === null) {
            imageproduct= <div><h1>Loading Image ...</h1></div>
        }else{
            imageproduct = <div style={{ backgroundImage: `url(${this.props.product.product[0].image})` }} className="product-image">
            </div>;
            productname = this.props.product.product[0].name;
            productdesc = this.props.product.product[0].description;
            productbrand = <a href="#">{this.props.product.product[0].brand}</a>;
            

            if (this.props.product.product[0].discount !== null){
                productprice = this.props.product.product[0].price * (1- this.props.product.product[0].discount)
                showproductprice = <p>Price: ${parseFloat(productprice).toFixed(2)} ({this.props.product.product[0].discount*100}%)</p>
            }else{
                productprice = this.props.product.product[0].price;
                showproductprice = <p>Price: ${productprice}</p>
            }
            if (this.props.product.product[0].stocks >= 10){
                stocknumber = <p>In Stock</p>
            } else if (this.props.product.product[0].stocks < 10 && this.props.product.product[0].stocks >0){
                stocknumber = <p>{this.props.product.product[0].stocks} left in stocks</p>
            }

            if(this.state.quantity >=1){
                cartprice = <p>Price: ${parseFloat(productprice * this.state.quantity).toFixed(2)}</p>
            }else{
                cartprice = <p>Quanity is not valid</p>
            }
            shippingprice = <p>Shipping: ${parseFloat(productprice * this.state.quantity * 0.05).toFixed(2)} (5%)</p>
            
        }
        return (
            <div className='product-container'>
                <div className='products-style-grid' >
                    {imageproduct}
                    <div className="product-detail">
                        <h2>{productname}</h2>
                        <div className="brand">
                            by {productbrand}
                        </div>
                        <div className="review">
                            <p>4/5</p>
                        </div>
                        <div className="Price">
                            {showproductprice}
                        </div>
                        <div className="description">
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
                            <input type="number" min="0" step="1" maxLength="4"  value={this.state.quantity} name='quantity' onChange={this.onChange}/>
                        </div>

                        <div className='AddtoCart'>
                            <button onClick={() => this.AddCart(this.props.product.product[0].id, this.state.quantity)}>Add to cart</button>
                        </div>
                        
                        <div className='BuyNow'>
                            <button onClick={() =>this.BuyItem(this.state.quantity)}>Buy Now</button>
                        </div>

                        
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { getproduct, buyproduct, addtocart}
)(ProductItem);