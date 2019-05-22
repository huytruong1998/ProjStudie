const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckStockInput(data) {
    let errors = {};

    data.productid = !isEmpty(data.productid) ? data.productid : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

    if (Validator.isEmpty(data.quantity)) {
        errors.quantity = 'Quantity field is required';
    }

    if (Validator.isEmpty(data.productid)) {
        errors.productid = 'Product ID field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
