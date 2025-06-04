import express from 'express';
import app  from "./app.js";
import { envs } from './src/config/envs.js';






const main = () => {
  const port = app.get('port');

  app.listen(port);
  
  console.log('App running on port http://localhost:3000/')
};

main();