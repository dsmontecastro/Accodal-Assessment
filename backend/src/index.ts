/**
 * Standard setup for ExpressJS.
 */


import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { config } from 'dotenv';

import items from './modules/routes.js';
import logger from './modules/logger.js';


// #region : Settings & Configuration ------------------------------------------------------------------------

// ENV
config();
const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = parseInt(`${process.env.PORT}`) || 8080;

// Express Configs
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// #endregion ------------------------------------------------------------------------------------------------


// #region : Application Proper + Routing --------------------------------------------------------------------

app.listen(PORT, HOST, () => {
    logger.info(`LISTENING @ ${HOST}:${PORT}`);
});


// Home/Index, primarily for checking if the server is running.
app.get('/', (_, res) => {
    res.send('<p> SERVER IS UP! </p>');

});

// Items-Routes
app.use('/items', items);

// #endregion ------------------------------------------------------------------------------------------------