import { useContext, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import useInput from "../hooks/useInput";
import "./page.css"
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import { LanguageContext } from "../contexts/LanguageContext";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";

function RegisterPage() {
  const [name, onNameChange] = useInput("")
  const [email, onEmailChange] = useInput("")
  const [password, onPasswordChange] = useInput("")
  const [confirmPassword, onConfirmPasswordChange] = useInput("")
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      customToast("All fields are required", "error", theme)
      return;
    }

    if (password !== confirmPassword) {
      customToast("Password and Confirm Password not equal", "error", theme)
      return;
    }
    try {
      const data = {
        name,
        email,
        password
      }

      const response = await register(data)
      customToast(response.message || "Registration Success", "success", theme)
      navigate("/login")
    } catch (error) {
      console.error("Error creating new user", error)
      customToast(error.message || "Terjadi kesalahan pada server", "error", theme)
      throw error
    }
  }

  return (
    <div className="auth-container">
      <div className="auth">
        <h1>Sign up</h1>
        <form onSubmit={onSubmitHandler}>
          <span className="auth-input">
            <label htmlFor="name">
              <FaUser />
            </label>
            <input type="text" id="name" placeholder={language === "en" ? "Name" : "Nama"} value={name} onChange={onNameChange} />
          </span>
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
              <span onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            )}
          </span>
          <span className="auth-input">
            <label htmlFor="confirm_password">
              <FaLock />
            </label>
            <input type={confirmPasswordVisible ? "text" : "password"} id="confirm_password" placeholder={language === "en" ? "Confirm password" : "Konfirmasi password"} onChange={onConfirmPasswordChange} />
            {confirmPassword.length > 0 && (
              <span onMouseDown={(e) => { e.preventDefault(); setConfirmPasswordVisible(!confirmPasswordVisible) }}>
                {confirmPasswordVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            )}
          </span>
          <div className="auth-button" style={{ marginTop: "8px" }}>
            <div>
              <button type="submit">{language === "en" ? "Register" : "Daftar"}</button>
              <span className="background-hover"></span>
            </div>
          </div>
        </form>
        <p>{language === "en" ? "Alredy have an account?" : "Sudah punya akun?"} <a href="/login">Sign in</a></p>
      </div>
    </div>
  )
}

export default RegisterPage