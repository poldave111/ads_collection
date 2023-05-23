import { API_URL } from '../config';

//variables 
const initialState = {
  allAds: [],
  selectedAd: null,
  error: null,
};

//selectors 
//export const getAd = (state, id) => state.find(item => item._id === id);
export const getAd = state => state.ads.selectedAd; 

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const SET_ADS = createActionName('SET_ADS');
const SELECT_AD = createActionName('SELECTED_AD');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const MESSAGE_SUCCESS = createActionName('MESSAGE_SUCCESS');

// //action creators
export const setMessageSuccess = payload => ({type: MESSAGE_SUCCESS, payload});
export const setAds = payload => ({type: SET_ADS, payload });
export const setSelectedAd = payload => ({type: SELECT_AD, payload });
export const errorRequest = payload => ({type: ERROR_REQUEST, payload });

export const deleteAD = (id) => {
  console.log('adsredux id', id);
  return async dispatch => {
    try {
      let res = await fetch(
        `${API_URL}/ads/${id}`,
        {
          method: 'delete',
        },
      );
      const result = await res.json();
      console.log('data from server', result);
      dispatch(getAllAds(result));
      //dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest({ error: e.message }));
    }

  };
}

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
        if(result.error) {
          dispatch(errorRequest({error: result.error}))
        } else {
          dispatch(setSelectedAd(result));
          dispatch(getAllAds());
        }
     
        //dispatch(setSelectedAd(result));
        //dispatch(endRequest());
      } catch(e) {
        dispatch(errorRequest({ error: e.message }));
      }
      
    };
  }

  export const saveAd = (payload) => {
    return async dispatch => {
  
      //dispatch(startRequest());
      try {
  
        let res = await fetch(
          `${API_URL}/ads/`,
          {
            method: 'post',
            body: payload,
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // },
          },
        );
        const result = await res.json();
        console.log('data from server', result);
        if(result.error) {
          dispatch(errorRequest({error: result.error}))
        } else {
          dispatch(setMessageSuccess("Ogłoszenie zostało dodane."));
          dispatch(getAllAds());
        }
     
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
        case MESSAGE_SUCCESS:
            return {...statePart, message: action.payload, error: null};
        case ERROR_REQUEST: 
            return {...statePart, error: action.payload.error, message: null};
        default: 
        return statePart; 
    }
}

export default adsReducer; 

