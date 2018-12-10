import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

const todos = (state = [], action) => {
    switch (action.type) {
      default:
        return state
    }
  }

  const reducers = combineReducers({
    todos,
    form: formReducer
});

export default reducers;