import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const GoogleAuth = () => {
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    const google = await signInWithPopup(auth, provider);
    console.log(google.user);
  };
  return (
    <>
      <div>
        <button onClick={(e) => handleGoogleAuth(e)}>Sign in to Google</button>
      </div>
    </>
  );
};

export default GoogleAuth;
