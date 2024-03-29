'use strict';
const validator = use('validators/role-register-validator');
const Rule = use('core/helpers/rule-helper');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/role', [
    checkSession,
    Rule.canAsync('user.permision', 'role.index'),
    'Role@index'
])
    .as('role.index');

Router.get('/api/roles/:page/:size?', [
    checkSession,
    'Role@paginateRoleData'
])
    .as('api.role');

Router.get('/role/create', [
    checkSession,
    Rule.canAsync('user.permision', 'role.create'),
    'Role@create'
])
    .as('role.create');

Router.get('/role/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'role.edit'),
    'Role@edit'
])
    .as('role.edit');

Router.post('/role', [
    checkSession,
    Rule.canAsync('user.permision', 'role.store'),
    upload.any(),
    // validator.validate,
    'Role@store'
])
    .as('role.store');

Router.get('/role/:roleData', [
    checkSession,
    Rule.canAsync('user.permision', 'role.show'),
    'Role@show'
])
    .as('role.show');

Router.get('/api/role/:roleData/edit', [
    checkSession,
    Rule.canAsync('user.permision', 'api.role.edit'),
    'Role@editRoleData'
])
    .as('api.role.edit');

Router.patch('/role', [
    checkSession,
    Rule.canAsync('user.permision', 'role.update'),
    upload.any(),
    'Role@update'
])
    .as('role.update');

Router.delete('/role/:roleData', [
    checkSession,
    Rule.canAsync('user.permision', 'role.destroy'),
    'Role@destroy'
])
    .as('role.destroy');
