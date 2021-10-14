import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditActions from "../../components/EditActions";
import { changePasswordUser } from "../../redux/actions/profileActions";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";

const ChangePasswordPage = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const initialState = {
    oldPassword: "",
    newPassword: "",
    cfPassword: "",
  };

  const [userData, setUserData] = useState(initialState);
  const { oldPassword, newPassword, cfPassword } = userData;
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== cfPassword)
      return dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: "Password does not match !" },
      });
    dispatch(changePasswordUser({ userData, auth }));
    setUserData(initialState);
  };
  return (
    <>
      <div className="edit">
        <div className="edit-contanier">
          <div className="edit-leftside">
            <EditActions />
          </div>
          <div className="edit-rightside">
            <form
              action="#"
              className="edit-rightside-form"
              onSubmit={handleSubmit}
            >
              <div className="edit-rightside-heading">
                <div className="edit-rightside-width">
                  <img src={auth?.user?.avatar} alt="Profile" />
                </div>
                <div className="edit-rightside-name">
                  <h1 className="edit-rightside-username">
                    {auth?.user?.username}
                  </h1>
                </div>
              </div>

              <div className="edit-rightside-input">
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label className="fz14" htmlFor="">
                      Old Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      className="form-input"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="edit-rightside-input">
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label className="fz14" htmlFor="">
                      New Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      className="form-input"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="edit-rightside-input">
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label className="fz14" htmlFor="">
                      Confirm New Password
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      className="form-input"
                      name="cfPassword"
                      value={cfPassword}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="edit-rightside-input center">
                <button
                  className="edit-rightside-submit"
                  disabled={
                    oldPassword && newPassword && cfPassword ? false : true
                  }
                  style={{
                    opacity: oldPassword && newPassword && cfPassword ? 1 : 0.3,
                  }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
