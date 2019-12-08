import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/wp-axios-plugin.min.js',
    format: 'iife',
    name: '$axios'
  },
  name: 'VueAxiosPlugin'
})

config.plugins.push(uglify.uglify({}, minify))

export default config