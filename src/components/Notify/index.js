import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import "./index.scss";
import News from "./News";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
const Notify = () => {
  const { notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        {notify.loading && <Loading />}
        {notify.error && (
          <News
            msg={{ title: "Error", body: notify.error }}
            handleShow={() =>
              dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} })
            }
            bgColor="bg-danger"
          />
        )}
        {notify.success && (
          <News
            msg={{ title: "Success", body: notify.success }}
            handleShow={() =>
              dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: {} })
            }
            bgColor="bg-success"
          />
        )}
      </div>
    </>
  );
};

export default Notify;
