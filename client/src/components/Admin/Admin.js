import React, { Component } from 'react';
import './Admin.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getallProduct } from '../../action/products';
import { getallorder} from '../../action/order';
import _ from 'lodash';
import { Link } from "react-router-dom";

class Admin extends Component {
    constructor(){
        super();
        this.state={
            tab: 'product'
        }
    }

    componentDidMount() {
        this.props.getallProduct();
        this.props.getallorder();
    }

    showproduct =() =>{
        this.setState({tab:'product'})
    }

    showorder= ()=>{
        this.setState({ tab: 'order' })
    }

    
    render(){
        const { products } = this.props.product;
        const {orders} = this.props.orders;
        let admincontent,normalcontent,productcontent,ordercontent;
        if (products === null) {
            productcontent = <h1>Nothing here</h1>
        } else{
            productcontent = _.map(products,(product,index)=>{
                return(
                    <div className="product-admin-display" key={index}>
                        <img src={product.image} alt="" style={{width: 200}} />
                        <span>Price:{parseFloat(product.price * (1-product.discount)).toFixed(2)}</span><br/>
                        <span>Stocks:{product.stocks}</span><br />
                        <span>Discount:{product.discount*100}%</span><br />
                        <span>Sold:{product.sold * 1}</span><br />
                        <button>Delete</button>
                        <Link to={`/product/admin/${product.id}`}><button>EDIT</button></Link>
                    </div>
                )
            })
            ordercontent = _.map(orders,(order,index)=>{
                return(
                    <div className="product-admin-display" key={index}>
                        <p>{order.orderid}</p>
                    </div>
                )
            })

        }
        admincontent = (
            <div className='content-display'>
                <div className="row">
                    <button onClick={this.showproduct}>Product</button>
                    <button onClick={this.showorder}>Order</button>
                    <button>Receipt</button>
                </div>
                <div className="product-item">
                    <div className="product-style-grid-admin">
                        {this.state.tab === 'product' ? productcontent : this.state.tab === 'order' ? ordercontent : null}
                        
                    </div>
                </div>
            </div>
        )

        normalcontent= (
            <div className='nocontent-display'>
                <h1>You are not Admin, Shoo!!!</h1>
            </div>
            
        )
        return <div className='admin-container'>
            {this.props.auth.user.role === 'admin'? admincontent : normalcontent}
        </div>
    }
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    orders: state.orders
});


export default connect(mapStateToProps, { getallProduct, getallorder})(Admin);