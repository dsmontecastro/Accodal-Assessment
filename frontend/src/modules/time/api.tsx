import { useState, useEffect } from 'react';

import { TZ, GET, getDateTime } from './_shared';
import { Conversion } from './conversions';


export default function TimeAPI() {
    // Component that handles all TimeAPI-relevant processes.

    const [local, setLocal] = useState<string>('');

    useEffect(() => {
        // Fetches and sets the <local> dateTime on Component-Mount & Updates.

        const url = GET + TZ.PHT;

        fetch(url)
            .then(response => response.json())
            .then(json => getDateTime(json))
            .then(dateTime => setLocal(dateTime))
            .catch(error => console.error(error));

    }, []);


    return (

        <div className='flex justify-evenly
            landscape:flex-row landscape:h-[100px] landscape:w-full
            portrait:flex-col portrait:w-[150px] portrait:h-full
            px-[2%] py-[1%]
        '>

            {!local ? <p className='text-2xl'> Loading data... </p> :
                <>
                    <div className='tz'>
                        <p className='zone'> Local Time </p>
                        <p className='datetime'> {local} </p>
                    </div>

                    <Conversion local={local} name={'Pacific'} zone={TZ.PST} />
                    <Conversion local={local} name={'Eastern'} zone={TZ.EST} />
                    <Conversion local={local} name={'Western'} zone={TZ.WST} />
                    <Conversion local={local} name={'Greenwich'} zone={TZ.GMT} />
                </>
            }

        </div>

    )

}