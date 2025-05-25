import React, { useState } from "react";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  };
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* -------Left side----- */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw, 250px)]" />

      {/* -------Right side----- */}
      <form
        onSubmit={onsubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => {
                setIsDataSubmitted(false);
              }}
              src={assets.arrow_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          )}
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
            value={fullName}
            name=""
            id=""
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              required
              name=""
              id=""
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus-ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              required
              name=""
              id=""
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus-ring-2 focus:ring-indigo-500"
            />
          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="provide a short bio..."
            rows={4}
            required
            name=""
            id=""
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus-ring-2 focus:ring-indigo-500"
          ></textarea>
        )}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" name="" id="" />
          <p>Agree to the term of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
