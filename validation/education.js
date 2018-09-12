const Validator = require('validator');
const isEmpty = require('./is-Empty');

const ValidateEducationInput = (data) => {
    let errors = {};

    
    data.degree = !isEmpty(data.degree) ? data.degree : "";
    data.school = !isEmpty(data.school) ? data.school : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.to = !isEmpty(data.to) ? data.to : "";
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
    data.current = !isEmpty(data.current) ? data.current : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    if(Validator.isBoolean(data.from)){
        errors.current = "current is True or False"
    }
   
    if(Validator.isEmpty(data.degree)) {
        errors.degree = "Degree is required";
    }
    if(Validator.isEmpty(data.school)) {
        errors.school = "School is required";
    }
    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Field of study is required";
    }

    
             return {
                errors,
                isValid:isEmpty(errors)
            }

}

module.exports = ValidateEducationInput;