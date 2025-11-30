import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    //onAuthStateChange has a function for unSubscribing from the store.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //we are here unSubscribing from here.when component unMounts.
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 justify-between">
      <img className="w-44" alt="logo" src={LOGO} />
      {user && (
        <div className="flex p-2 ">
          <img className="w-12 h-12" alt="user-icon" src={user?.photoURL} />
          <button onClick={handleSignOut} className="font-bold text-white ml-2">
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;


