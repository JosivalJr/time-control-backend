import App from './App';
import { Knex } from './database/knex';

const port = process.env.APP_PORT || 3000;
const environment = process.env.NODE_ENV || 'dev';

const startServer = () => {
  App.listen(port, () => console.info(`Server running at port ${port}.`));
};

if (environment === 'dev') {
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
} else {
  startServer();
}
