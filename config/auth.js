'use strict';

/* Codes generated by: http://travistidwell.com/jsencrypt/demo/ */

const fs = require('fs');
const privateKey = fs.readFileSync(rPath('config/auth/private.key'), 'utf-8');
const publicKey = fs.readFileSync(rPath('config/auth/public.key'), 'utf-8');

module.exports = {
    jwt: {
        privateKey,
        publicKey
    }
};