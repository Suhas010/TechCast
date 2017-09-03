import axios from "axios";
import { ERRORCODE } from '../utils/constants';
import {ICON , API} from '../utils/config';

/**
 * json data to show on Screen1 Language Info
 */
export const Lang = [
  {
    name: 'Java',
    icon: ICON.Java,
    subTitle: 'JavaScript',
    repos: '1,44,654',
    api: API.Java,
  },
  {
    name: 'Python',
    icon: ICON.Python,
    subTitle: 'Python Lang',
    repos: '4,133',
    api: API.Python,
  },
  {
    name: 'JavaScript',
    icon: ICON.JavaScript,
    subTitle: 'JavaScript',
    repos: '88,3133',
    api: API.JavaScript,
  },
  {
    name: 'React',
    icon: ICON.React,
    subTitle: 'JavaScript',
    repos: '944,56543',
    api: API.React,
  },
  {
    name: 'Go Lang',
    icon: ICON.Go,
    subTitle: 'JavaScript',
    repos: '3,1311',
    api: API.Go,
  },
  {
    name: 'TensorFlow',
    icon: ICON.TensorFlow,
    subTitle: 'JavaScript',
    repos: '3,135',
    api: API.TensorFlow,
  },
];

export function getData(api, callBack) {

  return axios.get(api)
    .then(function (response) {
      console.log(response.status);

      if (response.status == ERRORCODE.SUCCESS) {
        callBack(response, ERRORCODE.SUCCESS);
      } else {
        callBack(null, response.status);
      }
    }).catch(function (error) {
      console.log(error, "**");
      callBack(error, ERRORCODE.INTERNET_NOT_AWAILABLE);
    });

}

/**
 * @description returns User details information
 * @author Suhas R More
 * @export
 * @param {any} userName 
 * @param {any} callBack 
 * @returns 
 */
export function getUserDetails(userName, callBack){
    
  return axios.get(API.User + userName)
    .then(function (response) {

      if (response.status == ERRORCODE.SUCCESS) {

        console.log("userDetails success", response);
         
        callBack(response, response.status);

      } else {
          callBack(null, response.status);
      }

    }).catch(function (error) {

      console.log(error, "**");
      callBack(null, ERRORCODE.INTERNET_NOT_AWAILABLE);

    });

}

/**
 * @description call repo details API and returns users all repos
 * @author Suhas R More
 * @export
 * @param {any} userName 
 * @param {any} callBack 
 * @returns 
 */
export function getRepoDetails(userName, callBack) {
 
  return axios.get(API.Repo + userName)
    .then(function (response) {

      if (response.status == ERRORCODE.SUCCESS) {
        
        console.log("repoDetails Success", response);
        callBack(response, response.status);

      } else {

          callBack(null, response.status);
      }

    }).catch(function (error) {
      
      console.log(error, "**");
      callBack(null, ERRORCODE.INTERNET_NOT_AWAILABLE);
    }
  );

  
}
  