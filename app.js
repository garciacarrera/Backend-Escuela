import express from 'express';
import { envs } from './src/config/envs.js';


const app = express();




app.use(express.static('public'));

app.set('port', envs.PORT);


export default app;