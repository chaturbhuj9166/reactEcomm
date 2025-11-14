import { useState } from "react";
import instance from "../config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await instance.post("/auth/login", data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        await checkAuthStatus();
        navigate("/home");
      }
    } catch (error) {
      console.log(error)
      setIsError(error.message);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      {isError && <p>{isError}</p>}
      <h2>Login to Ecommerce</h2>
      <div className="form-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className={isSubmitting ? "inProcess" : ""}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p>
      <Link to="/Register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
