import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const { darkMode, toggleTheme } = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const {  error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created! Check your email to confirm, or try logging in.");
  goToLogin();
};

  const goToLogin = () => {
    window.history.pushState({}, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className={`signup-page ${darkMode ? "night" : "light"}`}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .signup-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          font-family: Arial, sans-serif;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        /* LIGHT THEME */
        .signup-page.light {
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(42, 178, 220, 0.30),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 10%,
              rgba(80, 130, 220, 0.25),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #eef8fc,
              #dceef7
            );
        }

        /* NIGHT THEME */
        .signup-page.night {
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(5, 110, 160, 0.25),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 10%,
              rgba(20, 80, 130, 0.20),
              transparent 30%
            ),
            #050d15;
        }

        /* CARD */
        .signup-card {
          width: min(950px, 100%);
          min-height: 610px;
          display: grid;
          grid-template-columns: 45% 55%;
          overflow: hidden;
          border-radius: 28px;
          position: relative;

          transition:
            background 0.4s ease,
            box-shadow 0.4s ease;

          animation: cardIn 0.8s ease;
        }

        .light .signup-card {
          background: rgba(255, 255, 255, 0.96);
          box-shadow:
            0 25px 70px rgba(10, 55, 80, 0.22);
        }

        .night .signup-card {
          background: rgba(11, 23, 34, 0.96);
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* STAR SKY */
        .sky-section {
          position: relative;
          overflow: hidden;
          min-height: 610px;
          display: flex;
          align-items: flex-end;
          padding: 45px;
          color: white;

          background:
            radial-gradient(
              circle at 12% 15%,
              rgba(255,255,255,.95) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 35% 27%,
              rgba(255,255,255,.80) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 65% 14%,
              rgba(255,255,255,.90) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 82% 34%,
              rgba(255,255,255,.75) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 22% 50%,
              rgba(255,255,255,.70) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 55% 44%,
              rgba(255,255,255,.80) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 91% 68%,
              rgba(255,255,255,.75) 0 1px,
              transparent 2px
            ),
            linear-gradient(
              160deg,
              #075b86 0%,
              #087ca5 42%,
              #06456d 72%,
              #03283f 100%
            );

          background-size:
            180px 180px,
            230px 230px,
            190px 190px,
            260px 260px,
            210px 210px,
            280px 280px,
            240px 240px,
            auto;

          animation: skyMove 12s ease-in-out infinite alternate;
        }

        .sky-section::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 230px;
          left: -150px;
          bottom: 40px;

          background: rgba(70, 205, 225, 0.30);
          filter: blur(48px);

          transform: rotate(-15deg);
        }

        .sky-section::after {
          content: "";
          position: absolute;
          inset: 0;

          background: linear-gradient(
            to top,
            rgba(0, 18, 30, 0.82),
            rgba(0, 55, 85, 0.08)
          );
        }

        .sky-content {
          position: relative;
          z-index: 2;
        }

        .sky-content h1 {
          margin: 0 0 14px;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .sky-content p {
          margin: 0;
          max-width: 330px;
          font-size: 16px;
          line-height: 1.7;
          color: #d8f3ff;
        }

        /* FORM */
        .form-section {
          padding: 45px 60px;
          display: flex;
          align-items: center;
          position: relative;
        }

        .form-box {
          width: 100%;
          max-width: 420px;
          margin: auto;
        }

        .form-box h2 {
          margin: 0;
          font-size: 34px;
          transition: color 0.4s ease;
        }

        .light .form-box h2 {
          color: #10212d;
        }

        .night .form-box h2 {
          color: #f5fbff;
        }

        .subtitle {
          margin: 10px 0 25px;
          font-size: 14px;
          transition: color 0.4s ease;
        }

        .light .subtitle {
          color: #71808a;
        }

        .night .subtitle {
          color: #9db0bc;
        }

        /* NAME ROW */
        .name-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* FIELDS */
        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          margin-bottom: 7px;
          font-size: 13px;
          font-weight: 700;
          transition: color 0.4s ease;
        }

        .light .field label {
          color: #253640;
        }

        .night .field label {
          color: #dcebf2;
        }

        .field input {
          width: 100%;
          padding: 14px 15px;
          border-radius: 12px;
          outline: none;
          font-size: 14px;

          transition:
            0.25s,
            background 0.4s,
            color 0.4s;
        }

        .light .field input {
          border: 1px solid #dce3e7;
          background: #f4f7f9;
          color: #10212d;
        }

        .night .field input {
          border: 1px solid #294354;
          background: #142734;
          color: white;
        }

        .field input::placeholder {
          color: #8b9aa3;
        }

        .field input:focus {
          border-color: #087aa2;
          box-shadow:
            0 0 0 4px rgba(8, 122, 162, 0.13);
        }

        .light .field input:focus {
          background: white;
        }

        .night .field input:focus {
          background: #182f3e;
        }

        /* SIGN UP BUTTON */
        .signup-btn {
          width: 100%;
          border: none;
          padding: 15px;
          border-radius: 12px;
          background: #071820;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 3px;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          background: #087aa2;
          box-shadow:
            0 12px 28px rgba(8, 122, 162, 0.30);
        }

        /* SIGN IN */
        .login-text {
          text-align: center;
          margin-top: 22px;
          font-size: 14px;
          transition: color 0.4s ease;
        }

        .light .login-text {
          color: #71808a;
        }

        .night .login-text {
          color: #9db0bc;
        }

        .login-text button {
          border: none;
          background: none;
          color: #087aa2;
          font-weight: 700;
          cursor: pointer;
        }

        /* THEME BUTTON */
        .theme-button {
          position: absolute;
          top: 22px;
          right: 25px;
          z-index: 10;

          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .light .theme-button {
          background: #eef6fa;
          color: #075b86;
          box-shadow:
            0 5px 18px rgba(0,0,0,.10);
        }

        .night .theme-button {
          background: #1b3443;
          color: #ffe27a;
          box-shadow:
            0 5px 18px rgba(0,0,0,.30);
        }

        .theme-button:hover {
          transform: rotate(15deg) scale(1.08);
        }

        /* ANIMATION */
        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes skyMove {
          from {
            background-position:
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              center;
          }

          to {
            background-position:
              20px 10px,
              -15px 20px,
              15px -10px,
              -20px 15px,
              10px -15px,
              -10px 10px,
              15px -10px,
              center;
          }
        }

        /* MOBILE */
        @media (max-width: 750px) {
          .signup-page {
            padding: 18px;
          }

          .signup-card {
            grid-template-columns: 1fr;
          }

          .sky-section {
            min-height: 280px;
            padding: 30px;
          }

          .sky-content h1 {
            font-size: 32px;
          }

          .form-section {
            padding: 75px 25px 35px;
          }

          .name-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <div className="signup-card">

        {/* SKY SIDE */}
        <div className="sky-section">
          <div className="sky-content">
            <h1>Start learning.</h1>

            <p>
              Build your coding skills.
              <br />
              Learn. Practice. Grow with CodeMentor.
            </p>
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="form-section">

          {/* THEME BUTTON */}
          <button
            className="theme-button"
            onClick={toggleTheme}
            type="button"
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="form-box">

            <h2>Create Account</h2>

            <p className="subtitle">
              Join CodeMentor and start your coding journey.
            </p>

            <div className="name-row">

              <div className="field">
                <label>First Name</label>

                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Last Name</label>

                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

            </div>

            <div className="field">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <button className="signup-btn" type="button" onClick={handleSignup}>
              Sign Up
            </button>

            <div className="login-text">
              Already have an account?{" "}

              <button
                type="button"
                onClick={goToLogin}
              >
                Sign In
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}