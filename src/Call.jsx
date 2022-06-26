import React, {useEffect} from "react";
import Header from "./Header.jsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {archiveCall, getCall} from "./redux/calls/thunks.js";
import moment from "moment";

export function Call() {
  const params = useParams();
  useEffect(() => {
    dispatch(getCall(parseInt(params.id)));
  }, []);
  const callInfo = useSelector((state) => state.call.singleCall);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        {callInfo && (
          <div>
            <div className="call-info">
              <div className="call-info-item">
                <div className="call-info-title">Time of calling:</div>{" "}
                {moment(callInfo.created_at).format("MMMM, DD YYYY hh:mm A")}
              </div>
              <div className="call-info-item">
                <div className="call-info-title">From:</div> {callInfo.from}
              </div>
              <div className="call-info-item">
                <div className="call-info-title">To:</div> {callInfo.to ? callInfo.to : "No Caller ID"}
              </div>
              <div className="call-info-item">
                <div className="call-info-title">Via:</div> {callInfo.via}
              </div>
              <div className="call-info-item">
                <div className="call-info-title">Duration:</div> {callInfo.duration} seconds
              </div>
              <div className="call-info-item">
                <div className="call-info-title">Call type:</div> {callInfo.call_type}
              </div>
              <div
                className="button-container"
                onClick={() => {
                  navigate("/");
                }}>
                <div className="button call-button back-button">Back</div>
              </div>
              <div className="button-container">
                <div
                  className="button call-button archive-button"
                  onClick={() => {
                    dispatch(archiveCall(parseInt(params.id)));
                    setTimeout(() => {
                      navigate("/");
                    }, 1000);
                  }}>
                  Archived
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
