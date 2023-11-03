/**
 * Interface & validation for the Item JSON.
*/

import { z } from 'zod';

const Item = z.object({
    name: z.string().min(1).max(20),
    owner: z.string().min(1).max(20),
    desc: z.string().min(0).max(50).optional()
});


export default function validate(json: any) {
    /**
     * Validates Response-Bodies by triggering
     * a <ZodError> to be caught in the Item-Routes.
     * @param {any}   json Response-Body to validate.
     * @return {Item} Returns a proper <item> if valid.
    */

    return Item.parse(json);

}