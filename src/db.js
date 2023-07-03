const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://gsbfzszp:30hCtcBbF0KpoK6QKf2PsdoAE9GMIopD@ruby.db.elephantsql.com/gsbfzszp',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
