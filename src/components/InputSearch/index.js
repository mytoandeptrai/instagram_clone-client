import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../assets/images/loading.gif";
import { NOTIFY_TYPES } from "../../redux/types/notifyTypes";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";
import "./index.scss";
const InputSearch = () => {
  const { auth } = useSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue) {
      setLoad(true);
      getDataAPI(`search?username=${searchValue}`, auth.token)
        .then((res) => {
          setUsers(res.data.users);
          setLoad(false);
        })
        .catch((err) => {
          dispatch({
            type: NOTIFY_TYPES.NOTIFY,
            payload: { error: err.response.data.msg },
          });
          setLoad(true);
        });
    } else {
      setUsers([]);
      setLoad(false);
    }
  }, [searchValue, auth.token, dispatch]);

  const handleClose = () => {
    setSearchValue("");
    setUsers([]);
  };

  return (
    <>
      <div className="search-container">
        <form className="search-form">
          <input
            type="text"
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value.toLowerCase().replace(/ /g, ""))
            }
            className="search-input"
          />

          <div className="search-icon" style={{ opacity: searchValue ? 0 : 1 }}>
            <span className="material-icons">search</span>
            <span>Search</span>
          </div>

          {load && (
            <img src={LoadingIcon} alt="Loading" className="search-loading" />
          )}

          <div
            className="search-close"
            style={{ opacity: users.length === 0 ? 0 : 1 }}
            onClick={handleClose}
          >
            &times;
          </div>
          <div
            className="search-users"
            style={{ display: users.length === 0 ? "none" : "block" }}
          >
            {searchValue &&
              users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  handleClose={handleClose}
                />
              ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default InputSearch;
