import { useState, useEffect } from 'react';

import { TZ, GET, getDateTime } from './_shared';
import { Conversion } from './conversions';


export default function TimeAPI() {

    const [local, setLocal] = useState<string>('');

    useEffect(() => {

        const url = GET + TZ.PHT;

        fetch(url)
            .then(response => response.json())
            .then(json => getDateTime(json))
            .then(dateTime => setLocal(dateTime))
            .catch(error => console.error(error));

    }, []);


    return <>

        <div>

            {!local ? 'Fetching data...' :
                <div>
                    <p> Local Time: {local} </p>
                    <Conversion local={local} name={'Pacific'} zone={TZ.PST} />
                    <Conversion local={local} name={'Eastern'} zone={TZ.EST} />
                    <Conversion local={local} name={'Western'} zone={TZ.WST} />
                    <Conversion local={local} name={'Greenwich'} zone={TZ.GMT} />
                </div>
            }

        </div>

    </>

}