import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { darkMode, toggleTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToSignup = () => {
    window.history.pushState({}, "", "/signup");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className={`login-page ${darkMode ? "night" : "light"}`}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
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
        .login-page.light {
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
        .login-page.night {
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

        /* MAIN CARD */
        .login-card {
          width: min(950px, 100%);
          min-height: 570px;
          display: grid;
          grid-template-columns: 45% 55%;
          overflow: hidden;
          border-radius: 28px;
          position: relative;

          transition:
            background 0.4s ease,
            box-shadow 0.4s ease,
            transform 0.4s ease;

          animation: cardIn 0.8s ease;
        }

        .light .login-card {
          background: rgba(255, 255, 255, 0.96);
          box-shadow:
            0 25px 70px rgba(10, 55, 80, 0.22);
        }

        .night .login-card {
          background: rgba(11, 23, 34, 0.96);
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* SKY */
        .sky-section {
          position: relative;
          overflow: hidden;
          min-height: 570px;
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

        /* BLUE GLOW */
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

        /* DARK BOTTOM */
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

        /* FORM AREA */
        .form-section {
          padding: 55px 60px;
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
          margin: 10px 0 30px;
          font-size: 14px;
          transition: color 0.4s ease;
        }

        .light .subtitle {
          color: #71808a;
        }

        .night .subtitle {
          color: #9db0bc;
        }

        /* INPUT */
        .field {
          margin-bottom: 20px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
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
          padding: 15px 16px;
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

        /* FORGOT */
        .forgot {
          text-align: right;
          margin-top: -8px;
          margin-bottom: 22px;
        }

        .forgot button {
          border: none;
          background: none;
          color: #087aa2;
          cursor: pointer;
          font-weight: 600;
        }

        /* LOGIN BUTTON */
        .login-btn {
          width: 100%;
          border: none;
          padding: 16px;
          border-radius: 12px;
          background: #071820;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          background: #087aa2;
          box-shadow:
            0 12px 28px rgba(8, 122, 162, 0.30);
        }

        /* SIGN UP */
        .signup-text {
          text-align: center;
          margin-top: 25px;
          font-size: 14px;
          transition: color 0.4s ease;
        }

        .light .signup-text {
          color: #71808a;
        }

        .night .signup-text {
          color: #9db0bc;
        }

        .signup-text button {
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
          box-shadow: 0 5px 18px rgba(0,0,0,.10);
        }

        .night .theme-button {
          background: #1b3443;
          color: #ffe27a;
          box-shadow: 0 5px 18px rgba(0,0,0,.30);
        }

        .theme-button:hover {
          transform: rotate(15deg) scale(1.08);
        }

        /* ANIMATIONS */
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
          .login-page {
            padding: 18px;
          }

          .login-card {
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
        }
      `}</style>

      <div className="login-card">

        {/* SKY SIDE */}
        <div className="sky-section">
          <div className="sky-content">
            <h1>Welcome back</h1>

            <p>
              Keep learning. Keep building.
              <br />
              Continue your coding journey with CodeMentor.
            </p>
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="form-section">

          {/* DARK / LIGHT BUTTON */}
          <button
            className="theme-button"
            onClick={toggleTheme}
            type="button"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="form-box">

            <h2>Sign In</h2>

            <p className="subtitle">
              Sign in to continue your coding journey.
            </p>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot">
              <button type="button">
                Forgot password?
              </button>
            </div>

            <button className="login-btn" type="button">
              Sign In
            </button>

            <div className="signup-text">
              Don't have an account?{" "}

              <button
                type="button"
                onClick={goToSignup}
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}