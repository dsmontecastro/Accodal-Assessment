import Database from 'better-sqlite3';

const MAKE_ITEMS = 'CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, owner TEXT, desc TEXT);';

function startDB() {

    const db = new Database('./database.db', { verbose: console.log });

    db.pragma('journal_mode = WAL');
    db.exec(MAKE_ITEMS);

    return db;

}

const db = startDB();
export default db;