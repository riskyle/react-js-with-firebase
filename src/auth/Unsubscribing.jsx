import { unSubAuth, unsubCol, unsubDoc } from "../firebase";

const Unsubscribing = () => {
  const handleClick = () => {
    console.log("unsubscribing");
    unSubAuth();
    unsubCol();
    unsubDoc();
  };
  return (
    <>
      <div>
        <h3>Unsubscribing</h3>
        <button onClick={handleClick}>
          Unsubscribing from db/auth changes
        </button>
      </div>
    </>
  );
};

export default Unsubscribing;
