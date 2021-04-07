import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
const path = require('path')

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'jspackage'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
    babel({ babelHelpers: 'bundled' }),
    alias({
      entries: [
        { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
        { find: '@lib', replacement: path.resolve(__dirname, 'src/lib') },
        { find: '@config', replacement: path.resolve(__dirname, 'src/config') }
      ]
    })
  ]
}
