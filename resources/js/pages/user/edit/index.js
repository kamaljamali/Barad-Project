'use strict';

const EditUser = require('VUE-COMPONENTS/user/edit-user.vue').default;

/**
 * Edit class
 */
const Edit = function () {}
module.exports = Edit;

/**
 * Boot method
 */
Edit.boot = function () {
    Edit.initVue();
}

/**
 * Init vue
 */
Edit.initVue = function () {
    window.v =
        new Vue({
            el: '#app',

            components: {
                EditUser
            },

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadUserData();
                },

                loadUserData() {
                    this.$refs.userEdit.loadUserData(1);
                }
            },
        });
}

/* Boot */
Edit.boot();