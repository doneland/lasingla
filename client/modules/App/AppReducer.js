// Import Actions
import {SHOW_WELCOME_MESSAGE} from './AppActions';

// Initial State
const initialState = {
  showWelcomeMessage: false,
  message: 'Welcome to Universal React application.'
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WELCOME_MESSAGE:
      return {
        showWelcomeMessage: state.showWelcomeMessage,
      };

    default:
      return state;
  }
};

// Export Reducer
export default AppReducer;
