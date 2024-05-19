import supertest from 'supertest';

import App from '../src/App';
import { Knex } from '../src/database/knex';

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(App);
