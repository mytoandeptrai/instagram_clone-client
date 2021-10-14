import React from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import ProfileIcon from "../ProfileIcon";
import { STATUS_TYPES } from "../../redux/types/statusTypes";
const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <div className="status-container">
        <ProfileIcon src={auth.user.avatar} size="big-avatar" />
        <button
          className="status-btn"
          onClick={() => dispatch({ type: STATUS_TYPES.STATUS, payload: true })}
        >
          {auth.user.username}, what are you thinking?
        </button>
      </div>
    </>
  );
};

export default Status;
