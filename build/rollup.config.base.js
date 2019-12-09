import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const config = require('../package.json')

export default {
  input: 'src/index.js',
  name: 'wp-axios-plugin',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    cjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      VERSION: JSON.stringify(config.version)
    })
  ]
}
