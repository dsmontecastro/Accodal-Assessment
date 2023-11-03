/**
 * Standard setup for ExpressJS.
 */


import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';

import logger from './modules/logger.js';
import items from './modules/routes.js';


// #region : Settings & Configuration ------------------------------------------------------------------------

// ENV
config();
const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = parseInt(`${process.env.PORT}`) || 8080;

// Express Configs
const app = express();
app.use(express.json());
app.use(cors());

// #endregion ------------------------------------------------------------------------------------------------


// #region : Application Proper + Routing --------------------------------------------------------------------

app.listen(PORT, HOST, () => {
    logger.info(`LISTENING @ ${HOST}:${PORT}`);
});


app.get('/', (_, res) => {
    // Home/Index, primarily for checking if the server is running.
    res.send('<p> SERVER IS UP! </p>');

});

app.use('/items', items);

// #endregion ------------------------------------------------------------------------------------------------