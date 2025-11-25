// import { useState } from "react";
// import instance from "../config/axiosConfig.js";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { authentication } from "./Firebase.js";

// function Register() {
//   const [data, setData] = useState({
//     name: "",
//     username: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isError, setIsError] = useState(null);
//   const navigate = useNavigate();

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setIsSubmitting(true);
//       setIsError(null);

//       // const res = await instance.post("/auth/register", data);
//       await createUserWithEmailAndPassword(authentication, data.email, data.password);
      

//       // 🔥 BACKEND RESPONSE HANDLE
//       const success =
//         res.status === 201 ||
//         res.status === 200 ||
//         res.data?.success === true;

//       if (success) {
//         navigate("/login");
//       } else {
//         setIsError(res.data?.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.log(error);
//       setIsError(error.response?.data?.message || "Registration failed!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="form-container">
//       {isError && <p>{isError}</p>}
//       <h2>Register into Ecommerce</h2>

//       <div className="form-wrapper">
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               name="name"
//               id="name"
//               value={data.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               placeholder="Enter Username"
//               name="username"
//               id="username"
//               value={data.username}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="phone">Phone</label>
//             <input
//               type="text"
//               placeholder="Enter Phone"
//               name="phone"
//               id="phone"
//               value={data.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               id="email"
//               value={data.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               id="password"
//               value={data.password}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <button type="submit" className={isSubmitting ? "inProcess" : ""}>
//               {isSubmitting ? "Registering..." : "Register"}
//             </button>
//           </div>
//         </form>

//         <p>
//           Already Registered? <Link to="/login">Login Here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;





import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./Firebase.js";

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setIsError(null);

      // 🔥 ONLY FIREBASE SIGNUP
      await createUserWithEmailAndPassword(
        authentication,
        data.email,
        data.password
      );

      // Success → go to login page
      navigate("/login");

    } catch (error) {
      console.log(error);
      setIsError(error.message || "Registration failed!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      {isError && <p>{isError}</p>}
      <h2>Register into Ecommerce</h2>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              placeholder="Enter Phone"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              value={data.email}
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
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p>
          Already Registered? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
