/**
 * Root reducer.
 */
import {combineReducers} from 'redux';


// Import reducers.
import AppReducer from './modules/App/AppReducer';
import eventsReducer from './modules/Events/eventsReducer';


// Combine all reducers into one root reducer.
export default combineReducers({
  app: AppReducer,
  events: eventsReducer
});
