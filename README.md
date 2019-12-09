# @w6s/ajax

> A sample axios plugin

## How to install

### Script tag

```html
<script src="https://unpkg.com/wp-axios-plugin"></script>
```

### CommonJS

Firstly, npm install or yarn add

```bash
npm install --save @w6s/ajax

yarn add --save @w6s/ajax
```

## How to use

### Used by Vue

####  configure in your entry file

```javascript
import Vue from 'Vue'
import WpAxiosPlugin from 'vue-axios-plugin'

Vue.use(WpAxiosPlugin, {
  // other axios config
  baseURL: '',
  // request interceptor handler
  requestHandler: config => config,
  requestErrorHandler: error => Promise.reject(error),
  // response interceptor handler
  responseHandler: response => response,
  responseErrorHandler: error => Promise.reject(error)
})
```

#### http methods

```javascript
this.$get(url, data, options).then((response) => {
  console.log(response)
})
this.$post(url, data, options).then((response) => {
  console.log(response)
})
this.$delete(url, data, options).then((response) => {
  console.log(response)
})
this.$put(url, data, options).then((response) => {
  console.log(response)
})
```

### Used by pure javascript

```javascript
import WpAxiosPlugin from '@w6s/ajax'

const service = WpAxiosPlugin.create({
  // other axios config
  baseURL: '',
  // request interceptor handler
  requestHandler: config => config,
  requestErrorHandler: error => Promise.reject(error),
  // response interceptor handler
  responseHandler: response => response,
  responseErrorHandler: error => Promise.reject(error)
})

service.$get(url, data, options)
service.$post(url, data, options)
service.$put(url, data, options)
service.$delete(url, data, options)
```