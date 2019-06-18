import React, { Component } from 'react';
import './Admin.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getallProduct, buyproduct } from '../../action/products';
import { getallorder, changestatus} from '../../action/order';
import _ from 'lodash';
import { Link } from "react-router-dom";

class Admin extends Component {
    constructor(){
        super();
        this.state={
            tab: 'product',
            orderid:null,
            orderstatus:'all'
        }
    }

    componentDidMount() {
        this.props.getallProduct();
        this.props.getallorder();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.orders.orders === this.props.orders.orders){
            this.props.getallorder();
        }
        
        
    }

    slectOrder(id){
        this.setState({orderid: id})
    }

    showproduct =() =>{
        this.setState({tab:'product'})
    }

    showorder= ()=>{
        this.setState({ tab: 'order' })
    }

    statuspending(id){
        const chagneData={
            status: 'pending',
            orderid: id
        }
        this.props.changestatus(chagneData);
    }

    statusfinnished(id,item){
        const chagneData = {
            status: 'finnished',
            orderid: id
        }
        this.props.changestatus(chagneData);
        _.map(item.order,(item)=>{
            const buyData = {
                quantity: item.quantity,
                productid: item.id
            }
            this.props.buyproduct(buyData)
            
        })
        
    }
    orderdelete(id) {
        const chagneData = {
            status: 'delete',
            orderid: id
        }
        this.props.changestatus(chagneData);
    }

    
    render(){
        const { products } = this.props.product;
        const {orders} = this.props.orders;
        
        let admincontent, normalcontent, productcontent, ordercontent, selectorder;
        if (products === null) {
            productcontent = <h1>Nothing here</h1>
        } else{
            productcontent = _.map(products,(product,index)=>{
                return(
                    <div className="product-admin-display" key={index}>
                        <img src={product.image} alt="" style={{width: 200}} />
                        <span>Price:{parseFloat(product.price * (1 - product.discount)).toFixed(2)}€</span><br/>
                        <span>Stocks:{product.stocks}</span><br />
                        <span>Discount:{product.discount*100}%</span><br />
                        <span>Sold:{product.sold * 1}</span><br />
                        <button>Delete</button>
                        <Link to={`/product/admin/${product.id}`}><button>EDIT</button></Link>
                    </div>
                )
            })
            ordercontent = _.orderBy(orders,'startdate').map((order,index)=>{
                if(this.state.orderstatus ==='all' || order.status === this.state.orderstatus){
                    if (this.state.orderid === order.orderid) {
                        const OrderItem = _.map(order.item.order, (item, index) => {
                            return (
                                <div className='order-item' key={index}>
                                    <div className='row'>
                                        <div style={{ float: 'left' }}>
                                            <img src={item.image} width='150px' alt='' />
                                        </div>
                                        <div style={{ float: "right", marginLeft: '15px' }}>
                                            <p>Product: {item.name}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: {item.price.toFixed(2)}€</p>
                                            {item.discount !== null ? <p>Discount: {item.discount * 100}%</p> : null}
                                        </div>
                                    </div>

                                </div>

                            )
                        })
                        selectorder = (
                            <div className='selectOrderArea'>
                                <p>OrderID: {order.orderid}</p>
                                <p>UserID: {order.userid}</p>
                                {OrderItem}
                                <p>Total Price:{order.totalprice.toFixed(2)}€</p>
                                <div className='row'>
                                    {order.status === 'new' ? <button onClick={() => this.statuspending(order.orderid)}>Deliver</button> : null}
                                    {order.status === 'pending' ? <button onClick={() => this.statusfinnished(order.orderid,order.item)}>Finnished</button> : null}
                                    {order.status === 'finnished' ? <button onClick={() => this.orderdelete(order.orderid)}>DELETE</button> : null}

                                </div>
                            </div>
                        )
                    }
                    return (
                        <button onClick={() => this.slectOrder(order.orderid)} className="order-admin-display" style={order.status === 'new' ? { backgroundColor: 'green' } : order.status === 'pending' ? { backgroundColor: 'yellow' } : order.status === 'finnished' ? { backgroundColor: 'gray' } : null} key={index}>
                            <p>{order.startdate}</p>
                        </button>

                    )
                }
                
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
                        {this.state.tab === 'product' ? productcontent : null}
                        
                    </div>
                    <div className='order-style-grid-admin'>
                    <div className='row'>
                        <div className='col-sm-5'>
                                {this.state.tab === 'order' ? <div className='order-style-grid-admin'>
                                    <button onClick={()=>this.setState({ orderstatus:'all'})}>All</button>
                                    <button onClick={()=>this.setState({ orderstatus: 'new' })}>New</button>
                                    <button onClick={()=>this.setState({ orderstatus: 'pending' })}>Pending</button>
                                    <button onClick={()=>this.setState({ orderstatus: 'finnished' })}>Finnished</button>
                                </div>:null}
                            {this.state.tab === 'order' ? ordercontent:null}
                        </div>
                        <div className='col-sm-7'>
                            {this.state.tab === 'order' ? selectorder : null}
                        </div>
                    </div>
                        
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


export default connect(mapStateToProps, { getallProduct, buyproduct, changestatus, getallorder})(Admin);