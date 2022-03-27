import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import JwtService from '@/common/jwt.service'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql'
// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Q_SETTINGS } from './graphql/queries'

const cache = new InMemoryCache()

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    projects: [Project!]!
    tasks: [Task!]!
  }

  extend type Query {
    settings: Settings!
  }

  enum StatsGroupBy {
    ENTRY_DATE
    CATEGORY_DESCRIPTION
    CATEGORY_ID
    PROJECT_DESCRIPTION
    PROJECT_ID
  }

  type Mutation {
    settingsUpdate(
      categorySelected: Number
      dateZoomed: String
      projectSelected: Project
      startDate: String
    ): Settings!
  }

  type Settings {
    categorySelected: Number
    dateZoomed: String
    projectSeleted: Project
    startDate: String
  }
`

const resolvers = {
  Mutation: {
    settingsUpdate: (_, args, { cache }) => {
      const data = cache.readQuery({ query: Q_SETTINGS })
      Object.assign(data.settings, args)
      cache.writeQuery({ query: Q_SETTINGS, data })
      return data.settings
    },
  },
}

const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions,
  cache,
  typeDefs,
  resolvers,
})

apolloClient.wsClient = wsClient

const isMobile = () => {
  return /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|KAIOS/i.test(
    navigator.userAgent,
  )
}

const defaultData = {
  settings: {
    __typename: 'Settings',
    categorySelected: null,
    dateZoomed: isMobile() ? new Date().toISOString().split('T')[0] : null,
    projectSelected: null,
    startDate: null,
  },
}

// Set initial state
cache.writeData({ data: defaultData })

// Ensure that state is set onLogin as this resets after writeData occurs
apolloClient.onResetStore(() => {
  cache.writeData({ data: defaultData })
})

// Call this in the Vue app file
export function createProvider() {
  // Create vue apollo provider

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler({ networkError }) {
      // eslint-disable-next-line no-console
      if (networkError) {
        console.log(
          '%cError',
          'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
          networkError,
        )
        if (
          networkError.statusCode == 401 &&
          networkError.result.errors[0].message == 'jwt expired'
        ) {
          console.log('Destroying token due to expired resonse')
          JwtService.destroyToken()
          this.$router.push({ name: 'login' })
        }
      }
    },
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin(token) {
  if (typeof localStorage !== 'undefined' && token) {
    JwtService.saveToken(token)
  }
}

// Manually call this when user log out
export async function onLogout() {
  if (typeof localStorage !== 'undefined') {
    JwtService.destroyToken()
  }
}

export { apolloClient }
