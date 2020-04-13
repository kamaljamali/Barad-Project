
'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function UserHelper() { }
module.exports = UserHelper;

/**
 * find all users data result 
 */
UserHelper.loadAllUserData = function loadAllUserData() {
    const User = mongoose.model('User');

    const filterQuery = {};
    const projection = {
        pwd: 0
    };

    return new Promise((resolve, reject) => {
        User.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find user data result 
 */
UserHelper.loadUserData = function loadUserData(userName) {
    const User = mongoose.model('User');

    const filterQuery = {
        name: userName
    };
    const projection = {
        pwd: 0
    };

    return new Promise((resolve, reject) => {
        User.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert user data  
 */
UserHelper.insertNewUser = function insertNewUser(data) {

    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        const user = new User(data)

        user.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update user data  
 */
UserHelper.updateUserData = function updateUserData(data) {
    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        User.findByIdAndUpdate(data._id, data, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete user data  
 */
UserHelper.deleteUserData = function deleteUserData(data) {
    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        User.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};