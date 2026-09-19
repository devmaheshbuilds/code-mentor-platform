/**
 * Shared Postgres pool.
 * DATABASE_URL comes from server/.env (Supabase connection string).
 */
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
