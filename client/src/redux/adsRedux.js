import { API_URL } from '../config';
//selectors 

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const SET_ADS = createActionName('SET_ADS');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// //action creators
export const setAds = payload => ({type: SET_ADS, payload });
export const errorRequest = payload => ({type: ERROR_REQUEST, payload });

export const getAllAds = () => {
    return async dispatch => {
  
      //dispatch(startRequest());
      try {
  
        let res = await fetch(
          `${API_URL}/ads`,
          {
            method: 'get',
          },
        );
        const result = await res.json();
        console.log('data from server', result);
        dispatch(setAds(result));
        //dispatch(endRequest());
  
      } catch(e) {
        dispatch(errorRequest({ error: e.message }));
      }
  
    };
  };

const adsReducer = (statePart = [], action) => {
    switch(action.type) {
        case SET_ADS:
            return action.payload;
        default: 
        return statePart; 
    }
}

export default adsReducer; 