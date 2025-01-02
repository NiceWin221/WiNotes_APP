import { useContext, useState } from "react";
import useInput from "../hooks/useInput";
import "./page.css"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { login } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { LanguageContext } from "../contexts/LanguageContext";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";

function LoginPage() {
  const [email, onEmailChange] = useInput("")
  const [password, onPasswordChange] = useInput("")
  const { setAuthToken } = useContext(AuthContext)
  const { language } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      customToast("All fields are required", "error", theme)
      return;
    }

    try {
      const data = {
        email,
        password
      }

      const response = await login(data)

      customToast(`${response.message}` || "User Loggedin", "success", theme);

      localStorage.setItem("token", response.data.accessToken);
      setAuthToken(response.data.accessToken);
    } catch (error) {
      console.error("Error authenticate user", error)
      customToast(error.message || "Terjadi kesalahan pada server", "error", theme);
      throw error
    }
  }

  return (
    <div className="auth-container">
      <div className="auth">
        <h1>Sign in</h1>
        <form onSubmit={onSubmitHandler}>
          <span className="auth-input">
            <label htmlFor="email">
              <FaEnvelope />
            </label>
            <input type="text" id="email" placeholder="Email" value={email} onChange={onEmailChange} />
          </span>
          <span className="auth-input">
            <label htmlFor="password">
              <FaLock />
            </label>
            <input type={passwordVisible ? "text" : "password"} id="password" placeholder="Password" value={password} onChange={onPasswordChange} />
            {password.length > 0 && (
              <span onMouseDown={(e) => { e.preventDefault(); setPasswordVisible(!passwordVisible) }}>
                {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            )}
          </span>
          <a href="/forgot" style={{ fontSize: "smaller", color: "#929498", textAlign: "right", position: "relative", bottom: "7px" }}>{language === "en" ? "Forgot password?" : "Lupa password?"}</a>
          <div className="auth-button">
            <div>
              <button type="submit">{language === "en" ? "Login" : "Masuk"}</button>
              <span className="background-hover"></span>
            </div>
          </div>
        </form>
        <p>
          {language === "en" ? "Don't have an account?" : "Tidak punya akun?"} <a href="/register">Sign up</a></p>
      </div>
    </div>
  )
}

export default LoginPage