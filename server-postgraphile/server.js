const express = require('express')
const { postgraphile } = require('postgraphile')
require('dotenv').config()
const config = require('./config.js')
const middleware = postgraphile(config.db.url, 'app_public', {
  watchPg: true,
  graphiql: !(process.env.NODE_ENV == 'production'),
  enhanceGraphiql: true,
  enableCors: true,
  jwtSecret: config.server.secret,
  jwtPgTypeIdentifier: 'app_public.jwt_token',
  pgDefaultRole: 'app_anonymous',
  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector'),
    require('@graphile/pg-aggregates').default,
    require('postgraphile-plugin-connection-filter'),
  ],
  simpleCollections: 'both',
  graphileBuildOptions: { pgOmitListSuffix: true },
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
