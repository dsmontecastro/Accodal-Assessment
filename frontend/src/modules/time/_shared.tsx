// region : Constants ----------------------------------------------------------------------------------------

const api = 'https://www.timeapi.io/api';
const url = `https://corsproxy.io/?${api}`;

export const GET = `${url}/Time/current/zone?timeZone=`;
export const POST = `${url}/Conversion/ConvertTimeZone`;

export enum TZ {
    PHT = 'Asia/Manila',
    PST = 'America/Los_Angeles',
    EST = 'America/New_York',
    WST = 'Australia/West',
    GMT = 'GMT'
}

// endregion -------------------------------------------------------------------------------------------------


// region : Functions ----------------------------------------------------------------------------------------

export function getDateTime(json: CurrentTime | ConversionResult): string {
    /**
     * Extracts the <dateTime> property from a JSON object.
     * @param { CurrentTime | ConversionResult } json The JSON object to be processed.
     * @return {string} Returns the expected <dateTime> object.
    */

    let dateTime = json.dateTime;
    dateTime = dateTime.split('.')[0];

    return dateTime.replace('T', ' ');

}

export function convertDateTime(json: Conversion): string {
    /**
     * Extracts the <dateTime> property from a Conversion JSON .
     * @param {Conversion} json The JSON object to be processed.
     * @return {string} Returns the expected <dateTime> object.
    */

    const result = json.conversionResult;
    return getDateTime(result);

}

// endregion -------------------------------------------------------------------------------------------------


// region : JSON Schema --------------------------------------------------------------------------------------

export interface ConvertRequest {
    fromTimeZone: string
    dateTime: string
    toTimeZone: string
    dstAmbiguity: string | null
}

interface Conversion {
    fromTimezone: string | null
    fromDateTime: string
    toTimeZone: string | null
    conversionResult: ConversionResult
}

export interface ConversionResult {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    seconds: number
    milliSeconds: number
    dateTime: string
    date: string | null
    time: string | null
    timeZone: string | null
    dstActive: boolean
}

interface CurrentTime extends ConversionResult {
    dayOfWeek: string
}

// endregion -------------------------------------------------------------------------------------------------