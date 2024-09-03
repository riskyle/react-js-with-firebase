import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Logout from "./Logout";
const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      // console.log("User created", user);
      setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={(e) => handleSignUpSubmit(e)}>
          <h3>Sign Up | Create Account</h3>
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
          <button>Sign Up</button>
        </form>
        <Logout />
      </div>
    </>
  );
};

export default SignUp;
