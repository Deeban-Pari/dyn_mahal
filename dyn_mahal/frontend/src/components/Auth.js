import React, { useState, useEffect } from "react";
import "../styles/Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to show forgot password form
  const [isForgotPasswordStep, setIsForgotPasswordStep] = useState("sendCode");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerification, setIsVerification] = useState(false); // Verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
    setIsVerification(false); // Reset verification state when toggling between login and signup
    setIsForgotPassword(false);
    setIsForgotPasswordStep("sendCode");
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true); // Show forgot password form
    setIsForgotPasswordStep("sendCode");
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false); // Return to login form
    setIsVerification(false); // Reset verification state
    setIsForgotPasswordStep("sendCode");
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Please check the details entered');
      }

      const data = await response.json();
      toast.success('Your Account has been created successfully!');
      setIsVerification('sendCode');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error('Please check the details entered');
      return;
    }
    handleSignup();
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or Password');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      toast.success('Login Successful!!');
      onAuthSuccess(email);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSendCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error in sending verification code');
      }

      toast.success('Verification code sent successfully!!');
      setIsVerification('codeInput');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/verify-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid verification code');
      }
  
      toast.success('Your account has been verified successfully!');
      onAuthSuccess(email);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSendForgotPasswordCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/send-forget-password-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'E-Mail doesn`t exist!');
      }

      const data = await response.json();
      toast.success('Code has been sent the Mail!');
      setIsForgotPasswordStep("codeInput");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleVerifyForgotPasswordCode = async () => {

    if (!password || !confirmPassword) {
      toast.error("Please enter and confirm your new password!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/auth/verify-forget-password-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid verification code");
      }

      toast.success("Your password has been updated successfully!");
      setIsForgotPassword(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and Password are required!');
      return;
    }
    handleLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="auth-wrapper">
      <div className="wrapper">
      <div className="title-text">
          {isForgotPassword ? (
            <div className="title">
              {isForgotPasswordStep === "sendCode"
                ? "Forgot Password"
                : "Verify and Reset Password"}
            </div>
          ) : isVerification ? (
            <div className="title">Verify Your Account</div>
          ) : (
            <>
              <div className={`title login ${isLogin ? "active" : ""}`}>{isLogin ? "Login Form" : "Signup Form"}</div>
            </>
          )}
        </div>

<div className="form-container">
      {isForgotPassword ? (
            <div className="form-inner">
            {isForgotPasswordStep === "sendCode" ? (
                <form action="#" className="forgot-password">
                  <div className="field">
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="field btn">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSendForgotPasswordCode}
                    >
                      Send Code
                    </button>
                  </div>
                  <div className="pass-link">
                    <a href="#" onClick={handleBackToLogin}>
                      Back to Login
                    </a>
                  </div>
                </form>
              ) : (
<form action="#" className="reset-password">
  <div className="field">
    <input
      type="text"
      placeholder="Enter Verification Code"
      required
      onChange={(e) => setVerificationCode(e.target.value)}
    />
  </div>
  <div className="field">
    <div className="field">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className="eye-icon"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </span>
    </div>
  </div>
  <div className="field">
    <div className="field">
      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm Password"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <span
        className="confirm-eye-icon"
        onClick={toggleConfirmPasswordVisibility}
      >
        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
      </span>
    </div>
  </div>
  <div className="field btn">
    <button
      type="button"
      className="btn btn-primary"
      onClick={handleVerifyForgotPasswordCode}
    >
      Change Password
    </button>
  </div>
</form>

              )}
            </div>
          ) : isVerification === 'sendCode' ? (
    <div className="form-inner">
      <form action="#" className="verify-email">
        <div className="field">
          <input type="email" placeholder="Email Address" required value={email} disabled />
        </div>
        <div className="field">
          <button type="button" className="btn btn-primary" onClick={handleSendCode}>
            Send Code
          </button>
        </div>
        <div className="pass-link">
          <a href="#" onClick={handleBackToLogin}>
            Back to Login
          </a>
        </div>
      </form>
    </div>
  ) : isVerification === 'codeInput' ? (
    <div className="form-inner">
      <form action="#" className="verify-code">
        <div className="field">
          <input
            type="text"
            placeholder="Enter Verification Code"
            required
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
        <div className="field btn">
          <button type="button" className="btn btn-primary" onClick={handleVerifyCode}>
            Verify Code
          </button>
        </div>
      </form>
    </div>
  ) : (
    <>
      <div className="slide-controls">
        <input
          type="radio"
          name="slide"
          id="login"
          checked={isLogin}
          onChange={handleToggle}
        />
        <input
          type="radio"
          name="slide"
          id="signup"
          checked={!isLogin}
          onChange={handleToggle}
        />
        <label
          htmlFor="login"
          className={`slide login ${isLogin ? 'active' : ''}`}
          onClick={handleToggle}
        >
          Login
        </label>
        <label
          htmlFor="signup"
          className={`slide signup ${!isLogin ? 'active' : ''}`}
          onClick={handleToggle}
        >
          Signup
        </label>
        <div className="slider-tab"></div>
      </div>

      <div className="form-inner">
        {isLogin ? (
          <form action="#" className="login" onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                placeholder="Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
    <div className="field">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className="eye-icon-login"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </span>
    </div>
  </div>
            <div className="pass-link">
              <a href="#" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>
            <div className="field btn">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        ) : (
          <form action="#" className="signup" onSubmit={handleSignupSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="Email Address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
    <div className="field">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className="eye-icon-signup"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </span>
    </div>
  </div>
  <div className="field">
    <div className="field">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className="eye-icon-signup-confirm"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "👁️" : "👁️‍🗨️"}
      </span>
    </div>
  </div>
            <div className="field btn">
              <button type="submit" className="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )}
</div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
