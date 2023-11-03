/**
 * Logging module for debugging different components of the Express-App.
*/

import pino from 'pino';

// Config ----------------------------------------------------------------------------------------------------

const base = { pid: false };

const transport = {
    target: 'pino-pretty',
    options: { colorize: true },
};


// Function --------------------------------------------------------------------------------------------------

export default pino({
    base: base,
    transport: transport
});