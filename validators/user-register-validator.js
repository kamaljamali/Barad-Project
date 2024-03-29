"use strict";

const validator = use("core/helpers/data-validator");

/**
 * User Login Validator
 */
function UserRegisterValidator() {}
module.exports = UserRegisterValidator;

UserRegisterValidator.async = true;

/**
 * Validation funciton
 */
UserRegisterValidator.lang = function lang() {
    return "fa";
};

/**
 * Validation funciton
 */
UserRegisterValidator.validate = function validate(req, res, next) {
    validator.validate(UserRegisterValidator, req, res, next);
};

/**
 * Data function
 */
UserRegisterValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nation_code: req.body.nation_code,
        cellphone: req.body.cellphone
    };
};

/**
 * Rules function
 */
UserRegisterValidator.rules = function rules(req) {
    const id = req.body._id || "XXX";

    return {
        user_id: "required",
        name: "required|min:3|max:25|user_name_available:" + id,
        password: "password_available:" + id,
        email: "required|email|email_available:" + id,
        first_name: "required|min:3|max:25",
        last_name: "required|min:4|max:25",
        nation_code: "required|size:10",
        cellphone: "required|size:11"
    };
};

/**
 * Messages function
 */
UserRegisterValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
UserRegisterValidator.attributes = function attributes() {
    return {
        user_id: "user_id",
        name: "user_name",
        password: "password",
        email: "email",
        first_name: "first_name",
        last_name: "last_name",
        nation_code: "nation_code",
        cellphone: "cellphone"
    };
};
