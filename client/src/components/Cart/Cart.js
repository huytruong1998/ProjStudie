import React, { Component } from 'react';
import './Cart.css';
import clothes from '../img/clothes.png';

class Cart extends Component {
    render() {
        return <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="item-container">
                <div className="productimg">
                    <img src={clothes} width='150px'/>
                </div>
                <div className="description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="priceqty">
                    <div className="proprice">
                        <h1>$$$</h1>
                    </div>
                    <div className="proquantity">
                        <input type="number" min="0" step="1" maxLength="4" value='0' name='quantity' onChange={this.onChange} />
                    </div>
                </div>
            </div>
        </div>
    }
}




export default Cart;