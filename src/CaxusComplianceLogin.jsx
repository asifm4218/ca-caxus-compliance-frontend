import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { PageTitle, SectionTitle, Paragraph } from "./components/Typography";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase.js";
import axios from "axios";

// Define the primary colors used for consistency
const PrimaryColor = {
  // Primary brand color for Sign In view elements
  Signin: "#0B0088",
  // Primary brand color for Register view elements
  Register: "#1E3A8A",
};

// ----------------------------------------------------
// 1. Sign In Component (Updated with Tab functionality)
// ----------------------------------------------------

/**
 * Renders the full Sign In view, including the two-column layout.
 * @param {object} props - Component props.
 * @param {function} props.setView - Function to switch the active view to 'register'.
 */
const SignInView = ({ setView }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSignIn = (e) => {
    e.preventDefault();
    // Mock authentication - in production, this would call an API
    const userData = {
      email: formData.email,
      username: formData.email.split("@")[0],
    };
    login(userData);
    navigate("/dashboard");
  };

  const handleGoogleSignin = async () => {
    try {
      // 1️⃣ Google Popup
      const result = await signInWithPopup(auth, googleProvider);

      // 2️⃣ Get Firebase ID Token
      const idToken = await result.user.getIdToken();

      // 3️⃣ Send token to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/google",
        { idToken }
      );

      console.log("User from backend:", response.data.user);
      login(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-5xl lg:grid lg:grid-cols-2 lg:gap-10">
      {/* Left side: Login Form */}
      <div className="flex flex-col items-center justify-center py-10 lg:py-0">
        <div className="w-full max-w-md space-y-4">
          {/* Headline & Body Text */}
          <div className="text-center w-full px-2 md:px-0">
            <PageTitle className="text-primary">Caxus Compliance</PageTitle>
            <Paragraph>Indian Compliance Management System</Paragraph>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full">
            <form
              onSubmit={handleSignIn}
              className="flex flex-col items-center space-y-6"
            >
              {/* Title Text */}
              <SectionTitle className="text-center">Quick Sign In</SectionTitle>

              {/* Google Sign-In Button */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#1a1a2e] text-white shadow-sm transition-opacity hover:opacity-90 gap-2 text-base font-medium leading-normal"
                >
                  {/* Google SVG Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      fill="#FFC107"
                    ></path>
                    <path
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      fill="#FF3D00"
                    ></path>
                    <path
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      fill="#4CAF50"
                    ></path>
                    <path
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.425,44,30.668,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      fill="#1976D2"
                    ></path>
                  </svg>
                  <span className="truncate">Continue with Google</span>
                </button>
              </div>

              {/* Meta Text */}

              {/* Divider */}
              <div className="relative w-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-xs font-medium text-gray-400">
                    OR CONTINUE WITH EMAIL
                  </span>
                </div>
              </div>

              {/* Tabs - Use onClick to change the view */}
              <div className="w-full">
                <div className="border-b border-gray-200">
                  <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                    <button
                      type="button"
                      className="whitespace-nowrap border-b-2 py-3 px-1 text-sm font-semibold border-[#0B0088] text-[#0B0088] transition-colors"
                      // The 'Sign In' button is active, so it keeps the current view
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
                      onClick={() => setView("register")} // Switch to Register View
                    >
                      Register
                    </button>
                  </nav>
                </div>
              </div>

              {/* Email Input */}
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  mail
                </span>
                <input
                  className="w-full h-12 rounded-lg border-gray-300 pl-10 pr-4 
                   focus:border-[#0B0088] focus:ring-[#0B0088] 
                   placeholder-[#111827]"
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  lock
                </span>
                <input
                  className="w-full h-12 rounded-lg border-gray-300 pl-10 pr-10 
                   focus:border-[#0B0088] focus:ring-[#0B0088]
                   placeholder-[#111827]"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>

              {/* Sign In Button */}
              <div className="w-full pt-2">
                <button
                  type="submit"
                  className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#0B0088] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] transition-opacity hover:opacity-90 shadow-lg hover:shadow-xl"
                >
                  <span className="truncate">Sign In</span>
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="w-full text-right">
                <a
                  className="text-sm font-medium hover:underline"
                  style={{ color: PrimaryColor.Signin }}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side: Illustration & Tagline (visible on large screens) */}
      <div className="hidden lg:flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          {/* Illustration SVG from your design */}
          <svg
            className="w-full h-auto text-primary"
            fill="currentColor"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M144 64c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM288 64c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM400 32c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32z"
              opacity="0.1"
              fill="#0B0088"
            ></path>
                                           {" "}
            <path
              d="M336 64h-16c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm32 96c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v64zM160 224h16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32h-16c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32zm-16 32v64c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16z"
              fill="#0e00a7ff"
              opacity="0.8"
            ></path>
                                           {" "}
            <path
              d="M448 352H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h416c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32zm0 80H32c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16z"
              fill="#0e00a7ff"
            ></path>
          </svg>
          <h3 className="mt-8 text-2xl font-semibold text-[#1F1F1F]">
            Automate your filings effortlessly.
          </h3>
          <p className="mt-2 text-[#6B7280]">
            Stay compliant with automated reminders, seamless document
            management, and expert support.
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. Register Component (Updated with Sign In Link functionality)
// ----------------------------------------------------

/**
 * Renders the Register Form.
 * @param {object} props - Component props.
 * @param {function} props.setView - Function to switch the active view to 'signin'.
 */
const RegisterView = ({ setView }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    gstNumber: "",
    cinNumber: "",
    username: "",
    password: "",
    employees: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration - in production, this would call an API
    const userData = {
      email: `${formData.username}@example.com`,
      username: formData.username,
      gstNumber: formData.gstNumber,
      cinNumber: formData.cinNumber,
    };
    login(userData);
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full max-w-[460px] rounded-xl bg-white p-10 shadow-xl">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center">
        <h2
          className="text-[28px] font-bold leading-tight"
          style={{ color: PrimaryColor.Register }}
        >
          Caxus Compliance
        </h2>
        <p className="text-[#6B7280] text-sm font-normal leading-normal pt-1">
          Indian Compliance Management System
        </p>
      </div>

      {/* Sub-Header */}
      <div className="mt-6 mb-6">
        <h3 className="text-[#111827] text-lg font-medium leading-tight text-center">
          Create Your Account
        </h3>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* GST Number Field */}
        <div className="flex flex-col">
          <label
            className="text-[#6B7280] text-xs font-normal pb-2"
            htmlFor="gst-number"
          >
            GST Number
          </label>
          <input
            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
            id="gst-number"
            maxLength="15"
            placeholder="Enter your 15-digit GST number."
            value={formData.gstNumber}
            onChange={(e) =>
              setFormData({ ...formData, gstNumber: e.target.value })
            }
            required
          />
        </div>

        {/* CIN Number Field */}
        <div className="flex flex-col">
          <label
            className="text-[#6B7280] text-xs font-normal pb-2"
            htmlFor="cin-number"
          >
            CIN Number
          </label>
          <input
            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
            id="cin-number"
            maxLength="21"
            placeholder="Enter your 21-digit CIN number."
            value={formData.cinNumber}
            onChange={(e) =>
              setFormData({ ...formData, cinNumber: e.target.value })
            }
            required
          />
        </div>

        {/* Username Field */}
        <div className="flex flex-col">
          <label
            className="text-[#6B7280] text-xs font-normal pb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
            id="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label
            className="text-[#6B7280] text-xs font-normal pb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 pr-10 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
              id="password"
              placeholder="Set your password."
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#6B7280] hover:text-[#111827]"
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined h-5 w-5">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Employees Field */}
        <div className="flex flex-col">
          <label
            className="text-[#6B7280] text-xs font-normal pb-2"
            htmlFor="employees"
          >
            How many employees do you have?
          </label>
          <input
            className="form-input flex w-full h-11 min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#6B7280] focus:border-[#1E3A8A] focus:ring-[#1E3A8A]"
            id="employees"
            placeholder="Enter number of employees."
            type="number"
            value={formData.employees}
            onChange={(e) =>
              setFormData({ ...formData, employees: e.target.value })
            }
          />
        </div>

        {/* Submit Button */}
        <button
          className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-[#1E3A8A] text-base font-bold text-white transition-colors hover:bg-[#1C3373] shadow-md hover:shadow-xl"
          type="submit"
        >
          Register Account
        </button>
      </form>

      {/* Sign In Link - Use onClick to change the view */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#6B7280]">
          Already have an account?
          <button
            className="font-medium hover:underline ml-1"
            style={{ color: PrimaryColor.Register }}
            onClick={() => setView("signin")} // Switch to Sign In View
            type="button"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. Main Application Component
// ----------------------------------------------------

/**
 * Main authentication wrapper component to manage Sign In and Register views.
 */
const CaxusAuth = () => {
  // State to manage which form is currently visible: 'signin' or 'register'
  const [currentView, setCurrentView] = useState("signin");

  const setView = (view) => {
    setCurrentView(view);
  };

  // Dynamically change the background gradient based on the active view
  const backgroundGradient =
    currentView === "signin"
      ? "from-[#E0EFFF] to-white" // Sign In background
      : "from-[#EAF2FF] to-white"; // Register background

  return (
    <div className="font-sans">
      {/* Outer container for the whole screen */}
      <div
        className={`relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b ${backgroundGradient} p-4 transition-all duration-300`}
      >
        {/* Conditionally render the appropriate view based on the state */}
        {currentView === "signin" ? (
          <SignInView setView={setView} />
        ) : (
          <RegisterView setView={setView} />
        )}
      </div>
    </div>
  );
};

export default CaxusAuth;
