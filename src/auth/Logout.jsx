import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const auth = getAuth();
  const handleClickLogout = async () => {
    const user_logout = await signOut(auth);
    console.log("user logout.");
  };
  return (
    <>
      <div>
        <h3>to logout</h3>
        <button onClick={handleClickLogout}>Logout</button>
      </div>
    </>
  );
};

export default Logout;
