const { Pool } = require('pg')

const pool = new Pool({
  database: 'smart-guide',
});

module.exports = pool
