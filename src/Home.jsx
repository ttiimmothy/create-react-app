import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {useSelector} from "react-redux";
import Header from "./Header.jsx";
import {getAllCalls} from "./redux/calls/thunks.js";
import {useDispatch} from "react-redux";
import {FiInbox} from "react-icons/fi";
import moment from "moment";
import {BsFillTelephoneInboundFill, BsFillTelephoneOutboundFill} from "react-icons/bs";
import {GrPowerReset} from "react-icons/gr";
import {resetAllCalls} from "./redux/calls/thunks.js";
import {archiveAllCalls} from "./redux/calls/thunks.js";
import {useNavigate} from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCalls());
  }, []);
  const allCalls = useSelector((state) => state.call.callList);
  let dateList = [];
  for (let i = 0; i < allCalls.length; i++) {
    if (!dateList.includes(allCalls[i].created_at.substring(0, 10))) {
      dateList.push(allCalls[i].created_at.substring(0, 10));
    }
  }
  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <div className="outer-border">
          <div
            className="inner-text button"
            onClick={() => {
              dispatch(resetAllCalls());
            }}>
            <GrPowerReset size={16} color={"#c7c0c0"} />
            <div className="inner-text-word">Reset all calls</div>
          </div>
        </div>
        <div className="outer-border">
          <div
            className="inner-text button"
            onClick={() => {
              dispatch(archiveAllCalls(allCalls.map((call) => call.id)));
            }}>
            <FiInbox size={16} color={"gray"} />
            <div className="inner-text-word">Archive all calls</div>
          </div>
        </div>
        {dateList.length > 0 &&
          dateList.map((date, index) => (
            <div key={index}>
              <div className="date">
                <span>{moment(date).format("MMMM, DD YYYY")}</span>
              </div>
              {allCalls
                .filter((call) => !call.is_archived && call.created_at.substring(0, 10) === date)
                .map((call, index) => {
                  return (
                    <div className="outer-border" key={index}>
                      <div
                        className="inner-text-for-calls button"
                        onClick={() => {
                          navigate(`/call/${call.id}`);
                        }}>
                        <div className="inner-text-for-calls-left">
                          {call.direction === "inbound" ? (
                            <BsFillTelephoneInboundFill size={16} color={"gray"} />
                          ) : (
                            <BsFillTelephoneOutboundFill size={16} />
                          )}
                          <div className="inner-text-detail">
                            <div>{call.from ? call.from : "No caller ID"}</div>
                            {call.call_type === "missed" ? (
                              <div className="inner-text-detail-word">tried to call on {call.to ? call.to : "No Caller ID"}</div>
                            ) : call.call_type === "answered" ? (
                              <div className="inner-text-detail-word">
                                {call.duration}s answered by {call.to ? call.to : "No Caller ID"}
                              </div>
                            ) : (
                              <div className="inner-text-detail-word">voicemail to {call.to ? call.to : "No Caller ID"}</div>
                            )}
                          </div>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="call-time">{moment(call.created_at.substring(11, 16), "hh:mm").format("hh:mm A")}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}
