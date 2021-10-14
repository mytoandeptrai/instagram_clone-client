import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  addUserAction,
  getConversations,
} from "../../redux/actions/messageActions";
import { MESSAGE_TYPES } from "../../redux/types/messageTypes";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";
import "./index.scss";
const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) return;
    try {
      setLoad(true);
      const res = await getDataAPI(
        `search?username=${searchValue}`,
        auth.token
      );
      setSearchUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: NOTIFY_TYPES.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearchValue("");
    setSearchUsers([]);
    dispatch({
      type: MESSAGE_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({
      type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE,
      payload: online,
    });
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  //Load more

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, auth, dispatch, page]);

  //Check user online - offline

  useEffect(() => {
    if (message.firstLoad) {
      dispatch({
        type: MESSAGE_TYPES.CHECK_ONLINE_OFFLINE,
        payload: online,
      });
    }
  }, [dispatch, online, message.firstLoad]);

  return (
    <>
      <div className="message-header">
        <form action="#" className="message-search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="message-search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter to search...."
          />
          <button type="submit" className="message-search-btn">
            Search
          </button>
        </form>

        <div className="message-list">
          {searchUsers.length !== 0 ? (
            <>
              {searchUsers.map((user) => (
                <div
                  className={`message-list-user ${isActive(user)}`}
                  key={user._id}
                  onClick={() => handleAddUser(user)}
                >
                  <UserCard user={user} />
                </div>
              ))}
            </>
          ) : (
            <>
              {message.users.map((user) => (
                <div
                  className={`message-list-user ${isActive(user)}`}
                  key={user._id}
                  onClick={() => handleAddUser(user)}
                >
                  <UserCard user={user} msg={true}>
                    {user.online ? (
                      <i className="fas fa-circle message-list-icon message-list-green"></i>
                    ) : (
                      auth.user.following.find(
                        (item) => item._id === user._id
                      ) && <i className="fas fa-circle message-list-icon"></i>
                    )}
                  </UserCard>
                </div>
              ))}
            </>
          )}
        </div>

        <button className="message-leftside-btn" ref={pageEnd}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
