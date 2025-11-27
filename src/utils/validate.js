export const checkValidData = (email, userName, password) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isUserName = /^[a-zA-Z0-9_]{3,20}$/.test(userName);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;'<>,.?/~`]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email is not Valid!";
  if (!isUserName) return "UserName is not Valid!";
  if (!isPasswordValid) return "Password is not Valid!";

  return null;
};
