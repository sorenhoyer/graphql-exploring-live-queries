import * as de from 'dotenv';

de.config();

const pgPromise = require('pg-promise');

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

export default pgp(config);

// export const connectToDb = () => pgp(config);
// export const disconnect = () => pgp.end();
