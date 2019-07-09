import React, { Component } from 'react';
import '../Admin.css';
import { connect } from 'react-redux';
import { addproduct} from '../../../action/products';
import isEmpty from '../../../validation/is-empty';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class CreateProduct extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            price: '',
            discount: '',
            brand: '',
            type: '',
            description: '',
            country: '',
            image: '',
            tag: 'equipment',
            stocks: '',
            imageFile:null,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    FileChangeHandler = (event) => {
        this.setState({ imageFile: event.target.files[0] })
    }

    CreateProduct(){
        const { imageFile } = this.state
        const formData = new FormData();
       
        formData.append(
                'image', imageFile)
        formData.append(
            'name', this.state.name)
        formData.append(
            'brand', this.state.brand)
        formData.append(
            'type', this.state.type)
        formData.append(
            'country', this.state.country)
        formData.append(
            'description', this.state.description)

        formData.append(
            'discount', (this.state.discount === 0) ? null : this.state.discount / 100)

        formData.append(
            'price', this.state.price)
        formData.append(
            'tag', this.state.tag)
        formData.append(
            'stocks', this.state.stocks)
        this.props.addproduct(formData)
        
        
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const {errors} = this.state;
        let propertype;
        
        if(this.state.tag === 'accessories'){
            propertype = <select id="lang" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.type
            })} name='type' onChange={this.onChange} value={this.state.type}>
                <option value="Earring">Earring</option>
                <option value="Necklace">Necklace</option>
                <option value="Bag">Bag</option>
            </select> 
        } else if (this.state.tag === 'clothes'){
            propertype = <select id="lang" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.type
            })} name='type' onChange={this.onChange} value={this.state.type}>
                <option value="Hat">Hat</option>
                <option value="Shoe">Shoe</option>
                <option value="Jacket">Jacket</option>
            </select> 
        } else if (this.state.tag === 'equipment'){
            propertype = <select id="lang" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.type
            })} name='type' onChange={this.onChange} value={this.state.type}>
                <option value="Skateboard">Skateboard</option>
                <option value="Snowboard">Snowboard</option>
            </select> 
        }else{
            propertype = <select id="lang" className={classnames('form-control form-control-lg', {
                'is-invalid': errors.type
            })} name='type' onChange={this.onChange} value={this.state.type}>
                <option value=" "> </option>
            </select> 
        }
        
            return <div className="admin-container">
                <div className="edit-item-style">
                    <div className="imgdisplay">
                        <img src={this.state.image} alt="" style={{ width: 300 }} />
                    </div>
                    <div>
                        <span>Name</span>
                        <p><input type="text" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.name
                        })} placeholder='name' name='name' onChange={this.onChange} value={this.state.name} />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )} </p>
                        <span>Brand</span>
                        <p><input type="text" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.brand
                        })} name='brand' placeholder='brand' onChange={this.onChange} value={this.state.brand} />
                            {errors.brand && (
                                <div className="invalid-feedback">{errors.brand}</div>
                            )} </p>
                        <span>Type</span>
                        <p>{propertype}{errors.type && (
                            <div className="invalid-feedback">{errors.type}</div>
                        )}</p>
                        <span>Description</span>
                        <p><textarea style={{ height: '250px' }} className='form-control form-control-lg' type="text" placeholder='description' name='description' onChange={this.onChange} value={this.state.description} /> </p>

                    </div>
                    <div>
                        <span>Country</span>
                        <p><input type="text" className='form-control form-control-lg' placeholder='country' name='country' onChange={this.onChange} value={this.state.country} /> </p>
                        <span>Discount</span>
                        <p><input type="number" min='0' className='form-control form-control-lg' style={{display:'inline-block'}} placeholder='discount(%)' name='discount' onChange={this.onChange} value={this.state.discount} />%</p>
                        <span>Price</span>
                        <p><input type="text" min='0' className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.price
                        })} placeholder='price' name='price' onChange={this.onChange} value={this.state.price} />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )} </p>
                        <span>Tag</span>
                        <p>
                            <select id="lang" className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.tag
                            })} name='tag' onChange={this.onChange} value={this.state.tag}>
                                <option value="equipment">equipment</option>
                                <option value="accessories">accessories</option>
                                <option value="clothes">clothes</option>
                                
                            </select> 
                        
                            {errors.tag && (
                                <div className="invalid-feedback">{errors.tag}</div>
                            )}  </p>
                        <span>Stocks</span>
                        <p><input type="number" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.stocks
                        })} placeholder='stocks' name='stocks' onChange={this.onChange} value={this.state.stocks} />
                            {errors.stocks && (
                                <div className="invalid-feedback">{errors.stocks}</div>
                            )} </p>
                        <span>Image url</span>
                        <p><input type='file' name='image' onChange={this.FileChangeHandler} />
                        </p>
                        <button className='create-product' onClick={()=>this.CreateProduct()}>Create New</button>
                    </div>
                </div>
            </div>
        }


    
}

CreateProduct.propTypes = {
    product: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product,
    errors: state.errors
});

export default connect(
    mapStateToProps,
     {addproduct}
)(CreateProduct);