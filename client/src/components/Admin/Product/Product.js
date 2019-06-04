import React, { Component } from 'react';
import '../Admin.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getproduct, editproduct, buyproduct, addtocart } from '../../../action/products';
import isEmpty from '../../../validation/is-empty';
import PropTypes from 'prop-types';

class AdminItem extends Component {
    constructor(){
        super();
        this.state={
            name:null,
            price:null,
            discount:null,
            brand:null,
            type:null,
            description:null,
            country:null,
            image:null,
            tag:null,
            stocks:null
        }
        this.onChange = this.onChange.bind(this);
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        this.props.getproduct(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.product.product) {
            const product = nextProps.product.product[0];
            // If product field doesnt exist, make empty string
            product.name = !isEmpty(product.name) ? product.name : '';
            product.brand = !isEmpty(product.brand) ? product.brand : '';
            product.type = !isEmpty(product.type) ? product.type : '';
            product.country = !isEmpty(product.country) ? product.country : '';
            product.description = !isEmpty(product.description) ? product.description : '';
            product.discount = !isEmpty(product.discount) ? product.discount : null;
            product.image = !isEmpty(product.image) ? product.image : null;
            product.price = !isEmpty(product.price) ? product.price : 0;
            product.tag = !isEmpty(product.tag) ? product.tag : '';
            product.stocks = !isEmpty(product.stocks) ? product.stocks : 0;

            this.setState({
                name: product.name,
                brand: product.brand,
                type: product.type,
                country: product.country,
                description: product.description,
                discount: product.discount,
                image: product.image,
                price: product.price,
                tag: product.tag,
                stocks: product.stocks
            })


        }
    }

    editproduct(id){
        const productdata = {
            name: this.state.name,
            brand:this.state.brand,
            type: this.state.type,
            country: this.state.country,
            description: this.state.description,
            discount: this.state.discount,
            image: this.state.image,
            price: this.state.price,
            tag: this.state.tag,
            stocks: this.state.stocks
        }
        this.props.editproduct(productdata,id);

    }
    render() {
        const product = this.props.product.product;
        if(product === null){
            return <h1>Loading</h1>
        }else{
            return <div className="admin-container">
                <div className="edit-item-style">
                    <div className="imgdisplay">
                        <img src={this.state.image} alt=""  style={{width: 300}}/>
                    </div>
                    <div>
                        <p><input type="text" placeholder='name' name='name' onChange={this.onChange} value={this.state.name}/> </p>
                        <p><input type="text" name='brand' placeholder='brand' onChange={this.onChange} value={this.state.brand} /> </p>
                        <p><input type="text" name='type' placeholder='type' onChange={this.onChange} value={this.state.type} /> </p>
                        
                        <p><textarea type="text" placeholder='description' name='description' onChange={this.onChange} value={this.state.description} /> </p>
                        
                    </div>
                    <div>
                        <p><input type="text" placeholder='country' name='country' onChange={this.onChange} value={this.state.country} /> </p>
                        <p><input type="text" placeholder='discount' name='discount' onChange={this.onChange} value={this.state.discount} /> </p>
                        <p><input type="text" placeholder='price' name='price' onChange={this.onChange} value={this.state.price} /> </p>
                        <p><input type="text" placeholder='tag' name='tag' onChange={this.onChange} value={this.state.tag} /> </p>
                        <p><input type="text" placeholder='stocks' name='stocks' onChange={this.onChange} value={this.state.stocks} /> </p>
                        <p><input type="text" placeholder='image' name='image' onChange={this.onChange} value={this.state.image} /> </p>
                        <button onClick={() =>this.editproduct(this.props.match.params.id)}>APPLY</button>
                    </div>
                </div>
            </div>
        }
        
        
    }
}

AdminItem.propTypes = {
    product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { getproduct, buyproduct, addtocart, editproduct }
)(AdminItem);