const { Client } = require('pg')
const client = new Client ({
  user: 'server',
  host: 'localhost',
  database: 'smart_tutorial',
  password: 'server',
  port: 5433,
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = client
