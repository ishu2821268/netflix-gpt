import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => navigate("/error"));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-sm bg-black/70 border-b border-white/10 shadow-lg">
        <div className="flex justify-between items-center px-6 md:px-10 py-2 h-16">
          <img
            className="w-32 md:w-40 cursor-pointer"
            alt="logo"
            src={LOGO}
            onClick={() => navigate("/browse")}
          />

          {user && (
            <div className="flex items-center gap-4">
              {showGptSearch && (
                <select
                  className="py-2 px-3 rounded-md bg-purple-800 hover:bg-purple-700 
                             text-white font-semibold shadow transition"
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
                onClick={handleGptSearchClick}
                className="py-2 px-4 rounded-md bg-purple-700 hover:bg-purple-600 
                           text-white font-semibold transition shadow"
              >
                {showGptSearch ? "HomePage" : "GptSearch"}
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-white/10 transition"
                >
                  <img
                    className="w-10 h-10 rounded-md object-cover border border-white/10"
                    alt="user-icon"
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${user?.email}&background=111827&color=fff`
                    }
                  />
                  <span className="hidden md:inline text-sm text-white font-medium">
                    {user?.displayName || user?.email || "Profile"}
                  </span>
                  <span className="text-xs text-white/80">▼</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-neutral-900 border border-white/10 rounded-md shadow-xl py-2 text-sm text-white">
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="font-semibold truncate">
                        {user?.displayName || "User"}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {user?.email}
                      </div>
                    </div>
                    <button className="w-full text-left px-4 py-2 hover:bg-white/10">
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-white/10">
                      Account Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-white/10">
                      Help Center
                    </button>

                    <div className="border-t border-white/10 my-1" />

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-red-600/80 text-red-400 hover:text-white font-semibold"
                    >
                      Sign-Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
