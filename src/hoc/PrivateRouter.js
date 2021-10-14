import WithAuth from "../customHook/WithAuth";

const PrivateRouter = (props) => WithAuth(props) && props.children;

export default PrivateRouter;
