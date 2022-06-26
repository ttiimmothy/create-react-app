import {useNavigate} from "react-router-dom";
import "regenerator-runtime/runtime";
import REACT_APP_API_SERVER from "../../../config";
import {getAllCallsSuccess, getCallSuccess} from "./actions";

export function getAllCalls() {
  return async (dispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/activities`);
    const result = await res.json();
    dispatch(getAllCallsSuccess(result));
  };
}

export function resetAllCalls() {
  return async (dispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/reset`);
    const result = await res.json();
    if (result.message == "done") {
      dispatch(getAllCalls());
    }
  };
}

export function archiveAllCalls(ids) {
  return async (dispatch) => {
    for (let id of ids) {
      const res = await fetch(`${REACT_APP_API_SERVER}/activities/${id}`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          is_archived: true,
        }),
      });
    }
    dispatch(getAllCalls());
  };
}

export function archiveCall(id) {
  return async (dispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/activities/${id}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        is_archived: true,
      }),
    });
  };
}

export function getCall(id) {
  return async (dispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/activities/${id}`);
    const result = await res.json();
    dispatch(getCallSuccess(result));
  };
}
