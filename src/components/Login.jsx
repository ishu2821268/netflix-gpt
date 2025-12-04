import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BANNER_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const userName = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = checkValidData(
      email?.current?.value,
      userName?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: userName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;
          setErrorMessage(errorCode + " - " + errorMsg);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then(() => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;
          setErrorMessage(errorCode + " - " + errorMsg);
        });
    }
  };

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          alt="banner-img"
          src={BANNER_IMAGE}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>
      <div className="relative z-10 flex items-center justify-center px-4 pt-24 md:pt-28 pb-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black/80 bg-gradient-to-b from-black/90 via-black/80 to-black/90 
                     rounded-2xl border border-white/10 shadow-2xl px-8 py-10"
        >
          <h1 className="font-bold text-3xl md:text-4xl mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <div className="space-y-4">
            <input
              ref={email}
              type="text"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md bg-[#121110] text-sm outline-none 
                         focus:ring-2 focus:ring-red-600"
            />

            {!isSignInForm && (
              <input
                ref={userName}
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md bg-[#121110] text-sm outline-none 
                           focus:ring-2 focus:ring-red-600"
              />
            )}

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-[#121110] text-sm outline-none 
                         focus:ring-2 focus:ring-red-600"
            />
          </div>

          {errorMessage && (
            <p className="mt-3 text-sm font-semibold text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-md bg-red-700 hover:bg-red-600 
                       font-semibold text-white text-sm md:text-base transition"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-4 text-sm text-gray-300">
            {isSignInForm ? "New to Netflix? " : "Already a user? "}
            <span
              className="font-semibold text-white cursor-pointer hover:underline"
              onClick={toogleSignInForm}
            >
              {isSignInForm ? "Sign up now" : "Sign in now"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
