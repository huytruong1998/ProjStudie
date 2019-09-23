import React, { Component } from 'react';
import './ProductPage.css';
import './../Homepage/Homepage.css';
import { connect } from 'react-redux';
import { getallProduct} from '../../action/products';
import _ from 'lodash';
import SingleProduct from '../common/SingleProduct';


class Product extends Component {

    constructor(){
        super();
        this.state = {
            filter:'all',
            currentPage:null,
            totalPage:null,
            search:''
        }
    }

    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)})
    }

    componentDidMount() {
        this.props.getallProduct();
        if (this.props.location.state!== undefined){
            this.setState({ filter: this.props.location.state.type })
        }        
    }
    showAll = () =>{
        this.setState({filter: 'all'})
    }
    showEquipment = () => {
        this.setState({ filter: 'equipment' })
    }

    showClothes = () => {
        this.setState({ filter: 'clothes' })
    }

    showAccessories = () => {
        this.setState({ filter: 'accessories' })
    }

    showSkateboard = () =>{
        this.setState({ filter: 'Skateboard' })
    }

    showSnowboard = () => {
        this.setState({ filter: 'Snowboard' })
    }

    showHat = () => {
        this.setState({ filter: 'Hat' })
    }

    showShoe = () => {
        this.setState({ filter: 'Shoe' })
    }

    showJacket = () => {
        this.setState({ filter: 'Jacket' })
    }

    showEarring = () => {
        this.setState({ filter: 'Earring' })
    }

    showNecklace = () => {
        this.setState({ filter: 'Necklace' })
    }

    showBag = () =>{
        this.setState({ filter: 'Bag' })
    }


    render() {
        
        const { products } = this.props.product;
        let displayproduct;
        if(products === null ){
            displayproduct = <h1>Nothing here</h1>
        }else{
            const filterproduct  = _.filter(products,(product)=>{
                return (product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || product.brand.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
            })
        
            
            displayproduct = _.map(filterproduct,(product,index)=>{
                if(product.tag === this.state.filter || product.type === this.state.filter || product.brand === this.state.filter || this.state.filter ==='all'){
                    return (
                        <SingleProduct key={index} image={product.image} productid={product.id} brand={product.brand} discount={product.discount} price={product.price} name={product.name} />
                    )
                }
            })
        }
        
        return (
            <div className='product-container row'>          
                    <div className="filter-bar ">
                    <div className='searchbar'>
                        <h5><b>Search Bar</b></h5>
                        <input type='text' style={{marginBottom:'20px'}} placeholder='Search product' value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    </div>
                    <div className="title-head-product">
                        <h5><b>Shop by category</b></h5>
                    </div>
                        <div className="category">
                            <ul>
                            <li ><a href="#" onClick={this.showAll}>All products</a></li>
                            <li ><a href="#" onClick={this.showEquipment}>Sport's Equipment</a>
                                    <ul>
                                    <li><a href="#" onClick={this.showSkateboard}>Skateboard</a> </li>
                                    <li ><a href="#" onClick={this.showSnowboard}>Snowboard</a> </li>
                                    </ul>
                                </li>
                            <li ><a href="#" onClick={this.showClothes}>Clothing</a>
                                    <ul>
                                    <li><a href="#" onClick={this.showHat}>Hat</a> </li>
                                    <li ><a href="#" onClick={this.showShoe}>Shoe</a> </li>
                                    <li ><a href="#" onClick={this.showJacket}>Jacket</a> </li>
                                    </ul>
                                </li>
                            <li ><a href="#" onClick={this.showAccessories}>Accessories</a>
                                    <ul>
                                    <li ><a href="#" onClick={this.showEarring}>Earring</a> </li>
                                    <li ><a href="#" onClick={this.showNecklace}>Necklace</a> </li>
                                    <li ><a href="#" onClick={this.showBag}>Bag</a> </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    <div className="title-head-product">
                        <h5><b>Brand</b></h5>
                    </div>
                    <div className="category">
                        <ul>
                            <li> <a href="#" onClick={()=>this.setState({filter:'Nike'})}>Nike</a> </li>
                            <li><a href="#" onClick={()=>this.setState({ filter: 'The North Face' })}>The North Face</a> </li>
                            <li><a href="#" onClick={()=>this.setState({ filter: 'Amazon' })}>Amazon</a> </li>
                        </ul>
                    </div>
                    
                    </div>
                    <div className="product-bar ">
                        <div className="products-style-grid">{displayproduct}</div>
                </div>  
            </div>
        );
    }
}


const mapStateToProps = state => ({
    product: state.product
});

export default connect(
    mapStateToProps,
    { getallProduct }
)(Product);

