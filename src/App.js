import Peer from "peerjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import "./App.scss";
import CallModal from "./components/CallModal";
import Header from "./components/Header";
import Notify from "./components/Notify";
import PostModal from "./components/PostModal";
import StatusModal from "./components/Status/StatusModal";
import PrivateRoute from "./customHook/PrivateRoute";
import LikedUsers from "./layouts/LikedUsers";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DiscoverPage from "./pages/DiscoverPage/index";
import EditPage from "./pages/EditPage";
import ExploreAll from "./pages/ExploreAll";
import ForgotPasswordPage from "./pages/FogotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MessagePage from "./pages/MessagePage/index";
import MessageUser from "./pages/MessageUser";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PostDetails from "./pages/PostDetails";
import ProfilePage from "./pages/ProfilePage/index";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { refreshToken } from "./redux/actions/authActions";
import { getNewsNotifies } from "./redux/actions/newsActions";
import { getPosts } from "./redux/actions/postActions";
import { getSuggestionsAction } from "./redux/actions/suggestionActions";
import { PEER_TYPES } from "./redux/types/peerTypes";
import { SOCKET_TYPES } from "./redux/types/socketTypes";
import SocketClient from "./socketClient";
function App() {
  const { auth, status, modal, call, postModal, likedUsers } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({
      type: SOCKET_TYPES.SOCKET,
      payload: socket,
    });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestionsAction(auth.token));
      dispatch(getNewsNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });
    dispatch({
      type: PEER_TYPES.PEER,
      payload: newPeer,
    });
  }, [dispatch]);

  return (
    <>
      <div className={`App ${(status || modal) && "modals"}`}>
        <Notify />
        {auth.token && <Header />}
        <div style={{ paddingTop: "80px" }}></div>
        {status && <StatusModal />}
        {auth.token && <SocketClient />}
        {call && <CallModal />}
        {postModal && <PostModal />}
        {likedUsers && <LikedUsers />}
        <Switch>
          <Route exact path="/" component={auth.token ? HomePage : LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <Route path="/forgotPassword" component={ForgotPasswordPage} />
          <Route path="/reset/:token" component={ResetPasswordPage} />
          <PrivateRoute path="/profile/:id" component={ProfilePage} />
          <PrivateRoute path="/post/:id" component={PostDetails} />
          <PrivateRoute path="/discover" component={DiscoverPage} />
          <PrivateRoute path="/exploreAll" component={ExploreAll} />
          <PrivateRoute exact path="/message" component={MessagePage} />
          <PrivateRoute exact path="/message/:id" component={MessageUser} />
          <PrivateRoute path="/edit" component={EditPage} />
          <PrivateRoute path="/changePassword" component={ChangePasswordPage} />
          <PrivateRoute path="*" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}

export default App;
