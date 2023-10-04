import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

function Logout() {
  const logOut = async () => {
    try {
    await signOut(auth);
    } catch (err){
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={logOut}> logOut</button>
    </div>
  );
};

export default Logout;