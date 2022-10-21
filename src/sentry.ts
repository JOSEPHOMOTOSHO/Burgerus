import * as Sentry from '@sentry/node'


Sentry.init({
    dsn: "https://c428ad304648403c9dde5e93445e9436@o4503937616379904.ingest.sentry.io/4503937619132417",
    tracesSampleRate: 1.0,
})
 export default Sentry