'use strict';

/**
 * DeparementCategoryIndexPage class
 */
const DepartmentCategoryIndexPage = function () {}
module.exports = DepartmentCategoryIndexPage;


/**
 * Boot method
 */
DepartmentCategoryIndexPage.boot = function () {
    DepartmentCategoryIndexPage.initVue();
}

/**
 * Init vue
 */
DepartmentCategoryIndexPage.initVue = function () {
    const DepartmentCategories = require('VUE-COMPONENTS/department-category/department-category.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                DepartmentCategories
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadDepartmentCategories();
                }
            }
        });
}

/* Boot */
DepartmentCategoryIndexPage.boot();
