export function getAllCallsSuccess(callList) {
  return {
    type: "getAllCalls",
    callList,
  };
}

export function getCallSuccess(call) {
  return {
    type: "getCall",
    call,
  };
}
