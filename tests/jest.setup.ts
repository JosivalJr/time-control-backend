import supertest from 'supertest';

import App from '../src/App';

export const testServer = supertest(App);
