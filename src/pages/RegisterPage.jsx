// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./register.css";


// const RegisterPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     wPhone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   async function handleRegister() {
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/", {
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         email: formData.email,
//         wPhone: formData.wPhone,
//         password: formData.password,
//       });

//       setSuccessMessage(res.data.message);
//       setError("");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   }

//   return (
//     <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
//       <div className="w-[400px] min-h-[500px] backdrop-blur-lg rounded-lg flex flex-col items-center justify-center relative pt-[40px] pb-[20px]">
//         <h1 className="text-3xl text-white mb-5">Register</h1>

//         {error && (
//           <p className="text-red-400 text-sm mb-3 text-center w-[80%]">
//             {error}
//           </p>
//         )}
//         {successMessage && (
//           <p className="text-green-400 text-sm mb-3 text-center w-[80%]">
//             {successMessage}
//           </p>
//         )}

//         <input
//           type="text"
//           name="firstname"
//           placeholder="First Name"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-3"
//           value={formData.firstname}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="lastname"
//           placeholder="Last Name"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-3"
//           value={formData.lastname}
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-3"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="wPhone"
//           placeholder="Phone Number"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-3"
//           value={formData.wPhone}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-3"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           className="w-[80%] bg-transparent border text-white border-white placeholder:text-white h-[40px] px-2 mb-5"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />

//         <button
//           className="w-[80%] bg-gray-600 text-white h-[45px]"
//           onClick={handleRegister}
//         >
//           Register
//         </button>

//         <p className="text-white mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-400">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    wPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.wPhone || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!/^\d{10}$/.test(formData.wPhone)) {
      setError("Phone number must be 10 digits");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/users/", formData);
      setSuccessMessage(res.data.message || "Registered successfully!");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-slate-600 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 space-y-4 shadow-lg text-white">



  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="text-blue-300 hover:text-white flex items-center gap-1 text-sm mb-2"
  >
    ← Back
  </button>

  <h2 className="text-3xl font-bold text-center">Create Account</h2>


        {error && (
          <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <InputField
          icon={<User className="w-5 h-5 text-blue-300" />}
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />

        <InputField
          icon={<User className="w-5 h-5 text-blue-300" />}
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />

        <InputField
          icon={<Mail className="w-5 h-5 text-blue-300" />}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          icon={<Phone className="w-5 h-5 text-blue-300" />}
          name="wPhone"
          placeholder="Phone Number"
          value={formData.wPhone}
          onChange={handleChange}
        />

        <div className="relative">
          <Lock className="absolute top-3 left-3 h-5 w-5 text-blue-300" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-white/10 border border-white/30 pl-10 pr-10 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-blue-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        <InputField
          icon={<Lock className="w-5 h-5 text-blue-300" />}
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
        >
          <UserPlus className="w-5 h-5" />
          Register
        </button>

        <div className="text-center text-sm mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-300 hover:text-white font-semibold">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3">{icon}</div>
      <input
        {...props}
        className="w-full bg-white/10 border border-white/30 pl-10 py-2 rounded-lg text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
