import {applyMiddleware,combineReducers,compose} from "redux";
import thunk from "redux-thunk";
import {callReducer} from "./redux/calls/reducer";
import {configureStore} from "@reduxjs/toolkit";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	call: callReducer,
});

export const store = configureStore(
	{reducer},
	composeEnhancers(applyMiddleware(thunk))
);
