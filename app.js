import express from 'express';
import { envs } from './configuration/envs.js';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(express.json());

/* Usamos los routes creados. A medida que agregamos, las colocamos acá */
app.use(userRoutes);

app.set('port', envs.PORT);

export default app;
