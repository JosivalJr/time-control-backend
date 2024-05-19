import supertest from 'supertest';

import App from '../src/App';

export const testApp = supertest(App);
