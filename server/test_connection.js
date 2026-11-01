/**
 * One-off script: prove DATABASE_URL can reach Supabase.
 * Run from server/: node test_connection.js
 * Do not commit a real password. Use server/.env locally.
 */
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    family: 6,
});

client
    .connect()
    .then(() => console.log('Connected to Supabase!'))
    .then(() => client.query('SELECT NOW()'))
    .then((res) => console.log(res.rows))
    .catch((err) => console.error('Connection failed:', err))
    .finally(() => client.end());
