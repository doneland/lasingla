import apiCaller from '../../util/apiCaller';


///////////////////////////////////////////////////////////////////////////
// Constants of action types.
///////////////////////////////////////////////////////////////////////////

export const GET_EVENTS = 'GET_EVENTS';



///////////////////////////////////////////////////////////////////////////
// Action creators.
///////////////////////////////////////////////////////////////////////////

/**
 * GET_EVENTS action.
 *
 * @param {Array} events - List of events.
 * @return {Object} action - Returns action object with array of events.
 */
export function getEvents(events) {
  console.log('Create action with events:', events);
  return {
    type: GET_EVENTS,
    events
  }
}


///////////////////////////////////////////////////////////////////////////
// API actions
///////////////////////////////////////////////////////////////////////////

/**
 * Fetch events from API.
 */
export function fetchEvents() {
  return (dispatch) => {
    return apiCaller('events')
      .then(res => {
        return dispatch(getEvents(res.events))
      })
      .catch(err => err);
  }
}
