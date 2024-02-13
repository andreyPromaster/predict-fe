// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import ticker from './ticker';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, ticker });

export default reducers;
