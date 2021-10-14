import React, { useState } from "react";
import LoadingIcon from "../../assets/images/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../../components/UserCard";
import FollowBtn from "../../components/FollowBtn";
import "./index.scss";
import { getSuggestionsAction } from "../../redux/actions/suggestionActions";
import { getDataAPI } from "../../utils/fetchData";
import { SUGGESTION_TYPES } from "../../redux/types/suggestionTypes";
import LoadMoreBtn from "../../components/LoadMoreBtn";
const ExploreAll = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `suggestionsUser?num=${suggestions.page * 9}`,
      auth.token
    );
    dispatch({
      type: SUGGESTION_TYPES.UPDATE_USERS,
      payload: res.data,
    });
    setLoad(false);
  };
  
  return (
    <>
      <div className="explore-container">
        <div className="explore-heading">
          <span>Suggested</span>
          {!suggestions.loading && (
            <i
              className="fas fa-redo"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(getSuggestionsAction(auth.token))}
            ></i>
          )}
        </div>
        <div className="explore-users">
          {suggestions.loading ? (
            <div className="explore-loading">
              <img src={LoadingIcon} alt="Loading" />
            </div>
          ) : (
            <>
              <div className="explore-details">
                {suggestions.users.map((user) => (
                  <UserCard key={user._id} user={user}>
                    <FollowBtn user={user} profiles={true} />
                  </UserCard>
                ))}
              </div>
            </>
          )}

          {load && (
            <div className="explore-loading">
              <img src={LoadingIcon} alt="Logo" />
            </div>
          )}
          <div className="explore-btn">
            {!suggestions.loading && (
              <LoadMoreBtn
                result={suggestions.result}
                page={suggestions.page}
                load={load}
                handleLoadMore={handleLoadMore}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreAll;
