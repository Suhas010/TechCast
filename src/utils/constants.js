
import LocalizedStrings from 'react-localization';
import {config} from '../utils/config';


/**
 * Standerd HTTP error codes
 */
export const ERRORCODE = {
    SUCCESS : 200,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TIME_OUT: 408,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    INTERNET_NOT_AWAILABLE: -1,
}


let strings = new LocalizedStrings({

  EN:{
   Repos: "Repos",
   Show: "Show",
   Error: "Error",
   BadGateway : "Bad GateWay",
   NetworkFailure: "Seems Like Internet connection is not available, Check your wifi cable or restart router",

 },

 MR: {
   how:"Come vuoi il tuo uovo oggi?",
   boiledEgg:"Uovo sodo",
   softBoiledEgg:"Uovo alla coque",
   choice:"Come scegliere l'uovo"
 }
});

strings.setLanguage(config.lang);

export default strings;