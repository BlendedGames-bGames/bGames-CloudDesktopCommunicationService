import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

//Routes
import cloud_desktop_communication from './routes/cloud_desktop_communication';

const app = express();

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use(cloud_desktop_communication);

export default app;