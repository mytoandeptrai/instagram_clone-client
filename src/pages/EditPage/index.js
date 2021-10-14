import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditActions from "../../components/EditActions";
import { updateProfileUser } from "../../redux/actions/profileActions";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
import { checkImage } from "../../utils/imageUpload";
import "./index.scss";
const EditPage = () => {
  const { auth } = useSelector((state) => state);
  const initialState = {
    fullname: "",
    username: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    if (auth.token) {
      setUserData(auth.user);
    }
  }, [auth.user, auth.token]);

  const { fullname, username, mobile, address, website, story, gender } =
    userData;

  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { error: err } });
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    
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
                  <img
                    src={
                      avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar
                    }
                    alt="Profile"
                  />
                </div>
                <div className="edit-rightside-name">
                  <h1 className="edit-rightside-username">
                    {auth?.user?.username}
                  </h1>
                  <div style={{ cursor: "pointer" }}>
                    <span className="edit-rightside-btn">
                      Change Profile Picture
                    </span>
                    <input
                      className="edit-rightside-file"
                      type="file"
                      name="file"
                      id="file_up"
                      accept="image/*"
                      onChange={changeAvatar}
                    />
                  </div>
                </div>
              </div>
              <div className="edit-rightside-input">
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="fullname"
                      value={fullname}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Username</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="username"
                      value={username}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Website</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="website"
                      value={website}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Bio</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="story"
                      value={story}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Address</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="address"
                      value={address}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Phone number</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="mobile"
                      value={mobile}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="edit-rightside-group">
                  <div className="edit-rightside-width">
                    <label htmlFor="">Gender</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-input"
                      name="gender"
                      value={gender}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="edit-rightside-input center">
                <button
                  className="edit-rightside-submit"
                  disabled={
                    fullname &&
                    username &&
                    gender &&
                    mobile &&
                    address &&
                    website &&
                    story
                      ? false
                      : true
                  }
                  style={{
                    opacity:
                      fullname &&
                      username &&
                      gender &&
                      mobile &&
                      address &&
                      website &&
                      story
                        ? 1
                        : 0.3,
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPage;
