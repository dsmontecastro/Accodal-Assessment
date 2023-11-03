/**
 * Holds all "/item" endpoints, working over the <Databases>' Items-Table.
*/


import { z } from 'zod';
import express from 'express';

import validate from '../models/item.js';

import db from './database.js';


const router = express.Router();
export default router;

// Shortcuts for the API-Response JSONs.
enum MESSAGE {
    SUCCESS = 'Success: Operation was completed.',
    FAILED = 'Error: Unknown failure occurred.',
    EMPTY = 'Error: The table is empty.',
    DNE = 'Error: Item does not exist.',
}


// #region : Endpoints ---------------------------------------------------------------------------------------

router.get('/', (_, res) => {
    /**
     * Endpoint for GETting ALL <item>(s).
     * @return {Item[]}      on success. 
     * @return {APIResponse} on failure.
    */

    const select = db.prepare('SELECT * FROM items;');
    const results = select.all();

    if (results) {
        res.status(200).send(results);
    } else {
        res.status(404).send({ id: 0, message: MESSAGE.EMPTY })
    }

});

router.get('/:id', (req, res) => {
    /**
     * Endpoint for GETting ONE <item> by its <id>.
     * @return {Item}        on success. 
     * @return {APIResponse} on failure.
    */

    const id = req.params.id;

    const select = db.prepare('SELECT * FROM items WHERE id = ?;');
    const result = select.get(id);

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(404).send({ id: 0, message: MESSAGE.DNE })
    }

});

router.post('/', (req, res) => {
    /**
     * Endpoint for POSTing an <item>.
     * @return {APIResponse} on either success or failure.
    */

    try {

        const body = validate(req.body);
        if (!body.desc) body.desc = '';

        console.log(body);

        const insert = db.prepare('INSERT INTO items (name, owner, desc) VALUES (@name, @owner, @desc);');
        const result = insert.run(body);

        if (result.changes > 0) {
            res.status(200).send({ id: result.lastInsertRowid, message: MESSAGE.SUCCESS });
        } else {
            res.status(500).send({ id: 0, message: MESSAGE.FAILED });
        }

    }

    catch (error) {
        if (error instanceof z.ZodError) {
            const issue = error.issues[0];
            res.status(400).send({ id: 0, message: `[${issue.path}]: ${issue.message}.` })
        }
    }

});

router.put('/:id', (req, res) => {
    /**
     * Endpoint for PUTting (updating) an <item> by its <id>.
     * @return {APIResponse} on either success or failure.
    */

    const id = req.params.id;

    try {

        const body = validate(req.body);
        if (!body.desc) body.desc = '';

        const update = db.prepare(`
            UPDATE items SET
            name = @name,
            owner = @owner,
            desc = @desc
            WHERE id = ?;
        `);

        const result = update.run(body, id);

        if (result.changes > 0) {
            res.status(200).send({ id: id, message: MESSAGE.SUCCESS });
        } else {
            res.status(404).send({ id: result.lastInsertRowid, message: MESSAGE.DNE })
        }

    }

    catch (error) {
        if (error instanceof z.ZodError) {
            const issue = error.issues[0];
            res.status(400).send({ id: 0, message: `[${issue.path}]: ${issue.message}.` })
        }
    }

});

router.delete('/:id', (req, res) => {
    /**
     * Endpoint to DELETE an <item> by its <id>.
     * @return {APIResponse} on either success or failure.
    */

    const id = req.params.id;

    const remove = db.prepare('DELETE FROM items WHERE id = ?;');
    const result = remove.run(id);

    if (result.changes > 0) {
        res.status(200).send({ id: id, message: MESSAGE.SUCCESS });
    } else {
        res.status(404).send({ id: result.lastInsertRowid, message: MESSAGE.DNE })
    }

});

// #endregion -------------------------------------------------------------------------------------------------