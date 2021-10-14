import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PrivateRouter = (props) => {
  const firstLogin = localStorage.getItem("firstLogin");
  const history = useHistory();

  useEffect(() => {
    if (!firstLogin) {
      history.push("/login");
    }
  }, [firstLogin, history]);

  return firstLogin;
};

export default PrivateRouter;
