import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import {terser} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
// import {eslint} from "rollup-plugin-eslint";
import PostCSS from 'rollup-plugin-postcss';
export default {
    input: "src/index.js",
    output: [
        {
            file: 'dist/bundle.esm.js',
            format: 'es'
        },
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs'
        },
        {
            name: 'GR',
            file: 'dist/bundle.umd.js',
            format: 'umd',
            esModule: false
        },
        {
            name: 'GR',
            file: 'dist/bundle.iife.js',
            format: 'iife'
        }
    ],
    plugins: [
        PostCSS({ include: /(?<!&module=.*)\.css$/,
            inject: false,
            extract:'vanillajs-components.min.css',
            modules: false,
            // sourceMap: (process.env.NODE_ENV === 'production' ? false : 'inline'),
            sourceMap: false,
            minimize: true
        }),
        resolve({extensions:['.js']}),
        commonjs(),
        // eslint({
        //    exclude: ['src/**/*.css', 'src/assets/**']
        // }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: ['@babel/env']
        }),
        terser()
    ],
}