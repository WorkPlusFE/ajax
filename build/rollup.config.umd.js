import base from './rollup.config.base'

const config = Object.assign({}, base, {
  exports: 'vue-axios-plugins',
  output: {
    file: 'dist/vue-axios-plugin.umd.js',
    format: 'umd',
    name: 'vue-axios-plugins'
  }
})

export default config