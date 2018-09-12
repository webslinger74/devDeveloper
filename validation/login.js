const Validator = require('validator');
const isEmpty = require('./is-Empty');

const ValidateLoginInput = (data) => {
    let errors = {};

    
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if(!Validator.isLength(data.password, {min:6, max:35})){
        errors.password = "Password must be between 6 and 35 characters";
    }
            return {
                errors,
                isValid: isEmpty(errors)
            }

}

module.exports = ValidateLoginInput;