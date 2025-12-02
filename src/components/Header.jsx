import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
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
          {showGptSearch && (
            <select
              className="py-2 px-4 mx-4 rounded-lg bg-purple-800 text-white font-bold my-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-4 rounded-lg bg-purple-800 text-white font-bold my-2"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "HomePage" : "GptSearch"}
          </button>
          <img
            className="w-12 h-12 rounded-sm"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white ml-2">
            Sign-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
