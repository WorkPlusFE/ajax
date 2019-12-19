import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/ajax.min.js',
    format: 'iife',
    name: '$ajax'
  },
  name: 'ajax'
})

config.plugins.push(uglify.uglify({}, minify))

export default config