import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../assets/images/loading.gif";
import Infos from "../../layouts/Infos";
import PostProfiles from "../../layouts/PostProfiles";
import SavedPost from "../../layouts/SavedPost";
import {
  getPostAuthAction,
  getProfileUsers,
} from "../../redux/actions/profileActions";
import "./index.scss";
const ProfilePage = () => {
  const { profile, auth } = useSelector((state) => state);
  const [savedTab, setSavedTab] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    } else {
      dispatch(getPostAuthAction({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <>
      <div className="profile-container">
        <Infos auth={auth} profile={profile} dispatch={dispatch} id={id} />

        {auth.user?._id === id && (
          <div className="profile-actions">
            <button
              className={
                savedTab
                  ? "profile-actions-posts"
                  : "profile-actions-posts profile-actions-active"
              }
              onClick={() => setSavedTab(false)}
            >
              Posts
            </button>
            <button
              className={
                savedTab
                  ? "profile-actions-saved profile-actions-active"
                  : "profile-actions-saved"
              }
              onClick={() => setSavedTab(true)}
            >
              Saved
            </button>
          </div>
        )}

        {profile.loading ? (
          <div className="profile-loading">
            <img src={LoadingIcon} alt="Loading" />
          </div>
        ) : (
          <>
            {savedTab ? (
              <>
                <SavedPost auth={auth} dispatch={dispatch} />
              </>
            ) : (
              <>
                <PostProfiles
                  auth={auth}
                  profile={profile}
                  dispatch={dispatch}
                  id={id}
                />{" "}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
