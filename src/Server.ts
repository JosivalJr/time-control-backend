import App from './App';
import { Knex } from './database/knex';
import 'dotenv/config';

const port = process.env.APP_PORT || 3000;
const environment = process.env.NODE_ENV || 'dev';

const startServer = () => {
  App.listen(port, () => console.info(`Server running at port ${port}.`));
};

if (environment === 'dev') {
  Knex.migrate.latest();
  startServer();
} else {
  startServer();
}
