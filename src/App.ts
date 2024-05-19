import express from 'express';
import employeeRoutes from './routes/employeeRoutes';

const App = express();
App.use(express.json());

App.use(employeeRoutes);

export default App;
