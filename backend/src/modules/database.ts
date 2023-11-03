/**
 * Readies and holds the <database> instance.
*/

import Database from 'better-sqlite3';

const MAKE_ITEMS = 'CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, owner TEXT, desc TEXT);';

function startDB(path: string = './database.db') {
    /**
     * Start the Database, and prepare it for exporting.
     * @param {string} [path = './database.db'] Path to the <database> file.
     * @return {Database.Database} Returns a <database> with an Items-Table ready.
    */

    const db = new Database(path);
    db.pragma('journal_mode = WAL');
    db.exec(MAKE_ITEMS);

    return db;

}

const db = startDB();
export default db;