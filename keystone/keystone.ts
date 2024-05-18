import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const DB_URL = process.env[`${process.env.KEYSTONE_ENV}_DB_URL`];
const DB_PORT = process.env[`${process.env.KEYSTONE_ENV}_DB_PORT`];
const DB_USER = process.env[`${process.env.KEYSTONE_ENV}_DB_USER`];
const DB_PASSWORD = process.env[`${process.env.KEYSTONE_ENV}_DB_PASSWORD`];
if (DB_PASSWORD === undefined) {
  throw new Error(`Environment variable DB_PASSWORD is not defined.`);
}
const DB_PASSWORD_ENCODED = encodeURIComponent(DB_PASSWORD);
const DB_DATABASE = process.env[`${process.env.KEYSTONE_ENV}_DB_DATABASE`];

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: `postgresql://${DB_USER}:${DB_PASSWORD_ENCODED}@${DB_URL}:${DB_PORT}/${DB_DATABASE}`,
      idField: { kind: 'autoincrement' },
    },
    lists,
    session,
  })
);
