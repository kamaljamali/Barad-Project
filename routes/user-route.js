'use strict';
const validator = use('validators/user-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/user', [
    // checkAuth,
    Rule.canAsync('user.permision', 'user.index'),
    'User@index'
])
    .as('user.index');

Router.get('/api/users/:page/:size?', [
    // checkAuth,
    'User@paginateUserData'
])
    .as('api.user');

Router.get('/user/create', [
    // checkAuth,
    Rule.canAsync('user.permision', 'user.create'),
    'User@create'
])
    .as('user.create');

Router.get('/user/edit', [
    // checkAuth,
    'User@edit'
])
    .as('user.edit');

Router.post('/user', [
    // checkAuth,
    validator.validate,
    'User@store'
])
    .as('user.store');

Router.get('/user/:userData', [
    // checkAuth,
    'User@show'
])
    .as('user.show');

Router.get('/api/user/:userData/edit', [
    // checkAuth,
    'User@editUserData'
])
    .as('api.user.edit');

Router.patch('/user/:userData', [
    // checkAuth,
    'User@update'
])
    .as('user.update');

Router.delete('/user/:userData', [
    // checkAuth,
    'User@destroy'
])
    .as('user.destroy');

Router.get('/user/logout', clearAuth)
    .as('user.logout');
