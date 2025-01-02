import { useContext } from "react";
import useInput from "../hooks/useInput"
import { postNote } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";

function NoteInputPage() {
  const [onTitle, onTitleChange] = useInput("")
  const [onBody, onBodyChange] = useInput("")
  const { authToken } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const maxTitleLength = 50;
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    const title = onTitle.length > 0 ? onTitle : "Tulis lah judul nya"
    const body = onBody.length > 0 ? onBody : "Ini juga isi lah"

    try {
      e.preventDefault()
      const response = await postNote({ token: authToken, title, body })
      customToast(response.message || "Note created", "success", theme)
      navigate("/")
    } catch (error) {
      console.error("Error adding note", error.message)
    }
  }

  return (
    <div className="note-input">
      <h1>Tambahkan Catatan</h1>
      <p style={{ textAlign: "right" }}>Sisa karakter: {maxTitleLength - onTitle.length}</p>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Title..." onChange={onTitleChange} maxLength={maxTitleLength} />
        <textarea placeholder="Deskripsi..." onChange={onBodyChange}></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default NoteInputPage