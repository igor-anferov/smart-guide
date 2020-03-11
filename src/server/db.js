const { Client } = require('pg')
const client = new Client ({
  user: 'postgres',
  host: 'localhost',
  database: 'smart_tutorial',
  password: 's02170065',
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
