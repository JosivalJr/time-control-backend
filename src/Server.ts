import App from './App';

const port = process.env.APP_PORT || 3000;
App.listen(port, () => console.log(`Running app at port ${port}.`));
