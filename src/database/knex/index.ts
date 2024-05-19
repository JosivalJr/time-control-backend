import { knex } from 'knex';
import { development, test, production } from './Environment';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return development;

    case 'test':
      return test;

    default:
      return production;
  }
};
export const Knex = knex(getEnvironment());
