import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/ajax.umd.js',
    format: 'umd',
    name: 'ajax'
  }
})

export default config