"use strict";

function ValidationRuleService() {}
module.exports = ValidationRuleService;

/**
 * Boot function
 */
ValidationRuleService.boot = function boot() {
    require("../helpers/service-helpers/user-service-heper.js");
};
