import produce from "immer";

export const initialState = {
  callList: [],
  singleCall: null,
};

export const callReducer = produce((state, actions) => {
  switch (actions.type) {
    case "getAllCalls":
      state.callList = actions.callList;
			return;
		case "getCall":
			state.singleCall = actions.call;
			return;
  }
}, initialState);
