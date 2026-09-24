/**
 * Shared Postgres pool.
 * DATABASE_URL comes from server/.env (Supabase connection string).
 */
require('dotenv').config();
const { Pool } = require('pg');

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.PG_FAMILY) {
    poolConfig.family = Number(process.env.PG_FAMILY);
}

const pool = new Pool(poolConfig);

module.exports = pool;
