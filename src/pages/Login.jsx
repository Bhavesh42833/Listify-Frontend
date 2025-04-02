import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // New state to handle initial check

  useEffect(() => {
    // Simulate an authentication check (if applicable)
    setTimeout(() => setIsCheckingAuth(false), 500); // Delay to ensure auth state is loaded
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { data } = response;
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  console.log("Auth Status:", isAuthenticated, "Loading:", loading);

  // Prevent rendering until authentication is checked
  if (isCheckingAuth || loading) return <p className="loader">Loading...</p>;

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
