import { GET_EVENTS } from './eventsActions';


const initialState = { data: []};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_EVENTS:
    return {
      data: action['events']
    };
    break;
  default:
    return state;
  }
}


export default eventsReducer;
