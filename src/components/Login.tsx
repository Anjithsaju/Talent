import React, { useState } from "react";

import "./login.css";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const checkSession = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/debug-session", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     console.log("Session Debug:", data);
  //     alert("Check console for session details");
  //   } catch (error) {
  //     console.error("Session Debug Error:", error);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status !== "success") {
        setError(result.message || "Authentication failed");
        return;
      }

      if (!isLogin) {
        // Successfully signed up - switch to login
        setIsLogin(true);
        setError("Account created! Please log in.");
        setFormData({ ...formData, email: "" });
      } else {
        // Successfully logged in - navigate to profile
        console.log("Login successful!");
        window.location.href = "/profile"; // Redirects to '/profile'
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main flex justify-center w-[100vw]">
      <div className="wrapper">
        {isLogin ? (
          <form id="loginForm" onSubmit={handleSubmit}>
            <h1>Login</h1>

            {error && (
              <div className="error-message text-red-500 mb-4">{error}</div>
            )}

            <div className="input-box">
              <label htmlFor="user1" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="user1"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="pass1" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="pass1"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn hover:!bg-white hover:!text-black"
              disabled={loading}
            >
              {loading ? "Processing..." : "Login"}
            </button>

            {/* <div className="mt-4">
              <button
                type="button"
                onClick={checkSession}
                className="text-blue-600 text-sm underline"
              >
                Debug Session
              </button>
            </div> */}

            <div className="login-re">
              <p>
                Don't have an account?
                <button
                  type="button"
                  className="toggle-btn text-[#3a0077] bg-transparent p-[1px] text-sm"
                  onClick={handleToggle}
                >
                  Register
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form id="registerForm" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>

            {error && (
              <div className="error-message text-red-500 mb-4">{error}</div>
            )}

            <div className="input-box">
              <label htmlFor="user" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="user"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="mail" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="mail"
                name="email"
                placeholder="Mail-Id"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="pass" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="pass"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn hover:!bg-white hover:!text-black"
              disabled={loading}
            >
              {loading ? "Processing..." : "Sign-Up"}
            </button>
            <div className="login-re">
              <p>
                Already have an account?
                <button
                  type="button"
                  className="toggle-btn text-[#3a0077] bg-transparent p-[1px] text-sm"
                  onClick={handleToggle}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
