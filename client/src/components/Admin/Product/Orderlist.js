import React, { Component } from 'react';
import '../Admin.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import isEmpty from '../../../validation/is-empty';
import PropTypes from 'prop-types';

class Orderlist extends Component {

    render() {
        return <h1>Hello</h1>


    }
}

Orderlist.propTypes = {
    product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    null
)(Orderlist);