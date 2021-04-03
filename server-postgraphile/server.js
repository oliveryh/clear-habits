const express = require('express')
const { postgraphile } = require('postgraphile')

const config = require('./config.js')

const middleware = postgraphile(config.db.url, 'app_public', {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
})

const app = express()
app.use(middleware)

const server = app.listen(config.server.port, () => {
  const address = server.address()
  if (typeof address !== 'string') {
    const href = `http://localhost:${address.port}${'/graphiql'}`
    console.log(`PostGraphiQL available at ${href} 🚀`)
  } else {
    console.log(`PostGraphile listening on ${address} 🚀`)
  }
})
