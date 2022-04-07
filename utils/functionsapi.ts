export const functionsAPi =
  process.env.NODE_ENV === 'production'
    ? ' https://us-central1-prod-clueconn.cloudfunctions.net/api'
    : 'https://us-central1-clueconn-73e93.cloudfunctions.net/api'
