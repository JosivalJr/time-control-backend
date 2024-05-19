import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import timeControlRoutes from './routes/timeControlRoutes';

const App = express();
App.use(express.json());

App.use(employeeRoutes);
App.use(timeControlRoutes);

export default App;
