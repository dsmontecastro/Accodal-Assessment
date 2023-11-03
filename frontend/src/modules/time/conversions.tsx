import { useState, useEffect } from 'react';

import { TZ, POST, convertDateTime, ConvertRequest } from './_shared';


interface Props {
    zone: TZ
    name: string
    local: string
}

export function Conversion({ zone, name, local }: Props) {

    const [dateTime, setDateTime] = useState<string>('');

    useEffect(() => {

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


    return <>
        {!dateTime ? 'Fetching data...' :
            <p> {name}: {dateTime} </p>
        }
    </>

}