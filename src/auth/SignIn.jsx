import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const cred = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
    //   console.log("user logged in", cred.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={(e) => handleSignInSubmit(e)}>
          <h3>Sign In</h3>
          <label>Email: </label>
          <input
            type="text"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <label>Password: </label>
          <input
            type="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
