import { API_URL } from '../config';

//variables 
const initialState = {
  allAds: [],
  selectedAd: null,
  error: null,
};

//selectors 
export const getAd = (state, id) => state.find(item => item._id === id);


//actions
const createActionName = actionName => `app/ads/${actionName}`;
const SET_ADS = createActionName('SET_ADS');
const SELECT_AD = createActionName('SELECTED_AD');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// //action creators
export const setAds = payload => ({type: SET_ADS, payload });
export const setSelectedAd = payload => ({type: SELECT_AD, payload });
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

  export const getAdById = (id) => {
    return async dispatch => {
  
      //dispatch(startRequest());
      try {
  
        let res = await fetch(
          `${API_URL}/ads/${id}`,
          {
            method: 'get',
          },
        );
        const result = await res.json();
        console.log('data from server', result);
        dispatch(setSelectedAd(result));
        //dispatch(endRequest());
  
      } catch(e) {
        dispatch(errorRequest({ error: e.message }));
      }
  
    };
  };

  export const saveAdById = (id, payload) => {
    return async dispatch => {
  
      //dispatch(startRequest());
      try {
  
        let res = await fetch(
          `${API_URL}/ads/${id}`,
          {
            method: 'put',
            body: payload,
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // },
          },
        );
        const result = await res.json();
        console.log('data from server', result);
        result.error ?  dispatch(errorRequest({error: result.error})) :  dispatch(setSelectedAd(result));
        //dispatch(setSelectedAd(result));
        //dispatch(endRequest());
      } catch(e) {
        dispatch(errorRequest({ error: e.message }));
      }
      
    };
  }

const adsReducer = (statePart = initialState, action) => {
    switch(action.type) {
        case SET_ADS:
            return {...statePart, allAds: action.payload, error: null};

        case SELECT_AD: 
            return {...statePart, selectedAd: action.payload, error: null};
          
        case ERROR_REQUEST: 
            return {...statePart, error: action.payload.error};
        default: 
        return statePart; 
    }
}

export default adsReducer; 