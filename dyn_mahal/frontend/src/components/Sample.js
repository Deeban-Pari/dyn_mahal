import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sample = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const toggleForgotPasswordPopup = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div className="modal-content p-sm-3">
      <div className="modal-body">
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              id="login-tab"
              className={`nav-link ${activeTab === 'login' ? 'active' : ''} text-4`}
              onClick={() => handleTabSwitch('login')}
              href="#"
              role="tab"
            >
              Login
            </a>
          </li>
          <li className="nav-item">
            <a
              id="signup-tab"
              className={`nav-link ${activeTab === 'signup' ? 'active' : ''} text-4`}
              onClick={() => handleTabSwitch('signup')}
              href="#"
              role="tab"
            >
              Sign Up
            </a>
          </li>
        </ul>
        <div className="tab-content pt-4">
          {activeTab === 'login' && (
            <div id="login" role="tabpanel" aria-labelledby="login-tab">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="txtUserLoginID"
                  required
                  placeholder="User Name or Email ID"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="txtPassword"
                  required
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="txtCaptchaCode"
                  required
                  placeholder="Captcha"
                  autoComplete="new-password"
                />
              </div>
              <div align="right">
                <span
                  className="form-group"
                  id="captcha"
                  style={{
                    border: '1px solid #CCC',
                    padding: '7px',
                    color: '#FFF',
                    marginBottom: '20px',
                    backgroundColor: '#797979',
                    borderRadius: '6px',
                  }}
                >
                  ODSEbk
                </span>
              </div>
              <input type="hidden" id="hidden-captcha" value="ODSEbk" />
              <div className="row mb-4">
                <div className="col-sm">
                  <div className="form-check custom-control custom-checkbox">
                    <input
                      id="remember-me"
                      name="remember"
                      className="custom-control-input"
                      type="checkbox"
                      defaultChecked
                    />
                    <label className="custom-control-label" htmlFor="remember-me">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-sm text-right">
                  <a
                    className="justify-content-end"
                    href="#"
                    onClick={toggleForgotPasswordPopup}
                  >
                    Forgot Password ?
                  </a>
                </div>
              </div>
              <button
                id="ValidateUser"
                className="btn btn-primary btn-block"
                type="submit"
              >
                Login
              </button>
            </div>
          )}

          {activeTab === 'signup' && (
            <div id="signup" role="tabpanel" aria-labelledby="signup-tab">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="txtRUserLoginID"
                  required
                  placeholder="Email ID"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="txtRMobileNo"
                  required
                  placeholder="Mobile Number"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="txtRUserFullName"
                  required
                  placeholder="User Full Name"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="txtRPassword"
                  required
                  placeholder="Password"
                  autoComplete="new-password"
                />
              </div>
              <div className="row mb-4">
                <div className="col-sm-8">
                  <div className="form-check custom-control custom-checkbox">
                    <input
                      id="terms-service"
                      name="terms"
                      className="custom-control-input"
                      type="checkbox"
                      defaultChecked
                    />
                    <label className="custom-control-label" htmlFor="terms-service">
                      I agree to the Terms Of Service
                    </label>
                  </div>
                </div>
              </div>
              <button
                id="RegisterUser"
                className="btn btn-primary btn-block"
                type="submit"
              >
                Sign up
              </button>
            </div>
          )}

          {showForgotPassword && (
            <div id="popup" className="popup">
              <div className="popup-content">
                <span className="close-btn" onClick={toggleForgotPasswordPopup}>
                  &times;
                </span>
                <h6>Forgot Password</h6>
                <div className="form-group">
                  <label htmlFor="txtFUserLoginID">User Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtFUserLoginID"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="txtEMailID">e-mail Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtEMailID"
                    autoComplete="off"
                  />
                </div>
                <button
                  id="ResetPassword"
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  Reset Password
                </button>
                <div className="alert-info small p-1 m-1">
                  New Password will be emailed to the above e-mail address provided.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sample;
