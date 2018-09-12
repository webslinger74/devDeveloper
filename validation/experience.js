const Validator = require('validator');
const isEmpty = require('./is-Empty');

const ValidateExperienceInput = (data) => {
    let errors = {};

    
    data.title = !isEmpty(data.title) ? data.title : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.to = !isEmpty(data.to) ? data.to : "";
    data.current = !isEmpty(data.current) ? data.current : "";
    data.location = !isEmpty(data.location) ? data.location : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    
    if(Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }
    if(Validator.isEmpty(data.company)) {
        errors.company = "Company is required";
    }
    if(Validator.isEmpty(data.from)) {
        errors.from = "from is required";
    }
    
             return {
                errors,
                isValid:isEmpty(errors)
            }

}

module.exports = ValidateExperienceInput;