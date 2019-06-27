const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckStockInput(data) {
    let errors = {};

    data.productinfo = !isEmpty(data.productid) ? data.productid : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

    if (Validator.isEmpty(data.productinfo)) {
        errors.productinfo = 'productinfo field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
