import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { initializeApp as fbInitializeApp } from 'firebase/app';
import { routes } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { pageNotFoundHandler } from './middlewares/page-not-found-middleware.js';
import 'dotenv/config';
import { auth } from './middlewares/auth.middleware.js';

initializeApp();
fbInitializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
});

const app = express();

auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => console.log('Servidor ativo na port 3000'));
