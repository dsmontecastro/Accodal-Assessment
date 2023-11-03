import { useState, useEffect } from 'react';

import { TZ, POST, convertDateTime, ConvertRequest } from './_shared';


interface Props {
    zone: TZ
    name: string
    local: string
}

export function Conversion({ zone, name, local }: Props) {
    /**
     * Converts the given <local> datetime to the target <zone>
     * @param {TZ}     zone  TimeZone enum linked to its IANA designation.
     * @param {string} name  Shorthand <name> to be used in the following JSX component.
     * @param {string} local DateTime to be converted.
    */

    const [dateTime, setDateTime] = useState<string>('');

    useEffect(() => {
        /**
         * Fetches and sets the <local> dateTime on Component-Mount & Updates.
         * Will only process if the <local> dateTime is not empty.
        */

        if (local) {

            const data: ConvertRequest = {
                fromTimeZone: TZ.PHT,
                dateTime: local,
                toTimeZone: zone,
                dstAmbiguity: ""
            }

            const url = POST;

            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(data)
            }

            fetch(url, options,)
                .then(response => response.json())
                .then(json => convertDateTime(json))
                .then(result => setDateTime(result))
                .catch(error => console.error(error));

        }

    }, [local, zone]);


    return (

        <div className='tz'>

            {!dateTime ? <p> Fetching data... </p> :
                <>
                    <p className='zone'> {name} </p>
                    <p className='datetime'> {dateTime} </p>
                </>
            }

        </div>
    )

}