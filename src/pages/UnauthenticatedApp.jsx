import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UnauthenticatedApp = () => {
  const { login } = useContext(AuthContext);
  return (
    <>
        <h2>Log in to join a chat room!</h2>
        <div>
            <button onClick={login} className="login">
                Login with Google
            </button>
        </div>
    </>
  );
};

export default UnauthenticatedApp;
