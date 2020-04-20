'use strict';

/**
 * User-rule class
 */
function Rule() {}
module.exports = Rule;

/**
 * Can read function
 *
 * @param      {Object}   payload  The payload
 * @return     {boolean}  User can/can't do action
 */
Rule.can = function can(ruleName, data) {
    /* Prepare ruleName for loading from sub-folders */
    ruleName = ruleName.replace(/\./g, '\/');

    if (!ruleName.endsWith('-rule')) {
        ruleName += '-rule';
    }
    
    ruleName = `rules/${ruleName}`;

    /* Try to laod rule-module */
    const RuleModule = use(ruleName);

    /* Return check function */
    return (req, res, next) => {
        const user = req.user;
        const result = RuleModule.check(user, data);

        if (result) {
            next();
        } else {
            next("Not enought permission to do this request");
        }
    }
};
