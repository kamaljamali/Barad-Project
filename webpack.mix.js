"use strict";

const path = require("path");
const mix = require("laravel-mix");
require("laravel-mix-alias");

require(path.resolve("core/modules/global-module.js")).setup();
const appConfig = use("config/app.js");
const output = appConfig.output_path;

/* Aliases */
mix.alias({
    JS: "resources/js",
    "JS-CORE": "resources/js/core",
    "JS-HELPERS": "resources/js/helpers",
    "JS-VALIDATORS": "resources/js/validators",
    VUE: "resources/js/vue",
    "VUE-COMPONENTS": "resources/js/vue/components",
    "VUE-HELPERS": "resources/js/vue/helpers",
    SASS: "resources/sass",
    FONTS: "resources/fonts",
    IMAGES: "resources/images",
    VIEWS: "resources/views",
    CONFIGS: "resources/configs",
    VALIDATORS: "validators",
});

/**
 *  Webpack config
 */
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.pug$/i,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/i,
                        use: ["pug-plain-loader"],
                    },
                    {
                        use: ["raw-loader", "pug-plain-loader"],
                    },
                ],
            },
            {
                test: /\.pug$/,
                loader: "pug-plain-loader",
            },
        ],
    },
});

/* Setup */
mix.setPublicPath(output).version();

/* Copy Files & Directories */
mix.copyDirectory("resources/images", `${output}/images`).copyDirectory(
    "resources/fonts",
    `${output}/fonts`
);

/* JS */
mix.js("resources/js/core/kernel.js", `${output}/js/core`)
    .js("resources/js/global/app.js", `${output}/js/global`)
    .js("resources/js/pages/factory.js", `${output}/js/pages`)

    .js(
        "resources/js/pages/head/index/index.js",
        `${output}/js/pages/head/index`
    )
    .js(
        "resources/js/pages/admin/createpermission/index/index.js",
        `${output}/js/pages/admin/createpermission/index`
    )
    .js(
        "resources/js/pages/auth/login/index.js",
        `${output}/js/pages/auth/login`
    )
    .js(
        "resources/js/pages/user/index/index.js",
        `${output}/js/pages/user/index`
    );

// /* SASS */
// mix.sass("resources/sass/core/kernel.scss", `${output}/css/core`)
//     .sass("resources/sass/global/app.scss", `${output}/css/global`)
//     .sass("resources/sass/pages/home/index.scss", `${output}/css/pages/home`)
//     .sass("resources/sass/pages/auth/login.scss", `${output}/css/pages/auth`);



/* SASS */
mix
    .sass("resources/sass/core/kernel.scss", `${output}/css/core`)
    .sass("resources/sass/layout/layout.scss", `${output}/css/layout`)
    .sass(
        "resources/sass/algorithm_result/algorithm_result.scss",
        `${output}/css/algorithm_result`
    )
    .sass("resources/sass/pages/home/index.scss", `${output}/css/pages/home`)
    .sass("resources/sass/pages/global/app.scss", `${output}/css/pages/global`)
    .sass("resources/sass/pages/auth/login.scss", `${output}/css/pages/auth`);


// /* Copy directory */
// mix.copyDirectory(
//     "resources/js/ckeditor4/ckeditor",
//     "public/js/ckeditor"
// );
