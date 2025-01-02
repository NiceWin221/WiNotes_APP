import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { deleteNote, getNote, postNote } from "../api";
import NoteDetail from "../components/NoteDetail";
import { LanguageContext } from "../contexts/LanguageContext";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";

function DetailPage() {
  const { id } = useParams()
  const { authToken } = useContext(AuthContext)
  const [detailNote, setDetailNote] = useState([])
  const [loading, setLoading] = useState(true)
  const [onTitle, setOnTitle] = useState("")
  const [onBody, setOnBody] = useState("")
  const { language } = useContext(LanguageContext)
  const [edit, setEdit] = useState(false)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const maxTitleLength = 50

  useEffect(() => {
    const fetchDetailNote = async () => {
      try {
        setLoading(true)
        const response = await getNote({ token: authToken, id })
        setDetailNote(response.data)
        setOnTitle(response.data.title)
        setOnBody(response.data.body)
      } catch (error) {
        console.error("Failed to fetch notes", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDetailNote()
  }, [authToken, id])

  const onEditHandler = async (e) => {
    e.preventDefault()
    const title = onTitle.length > 0 ? onTitle : "Tulis lah judul nya"
    const body = onBody.length > 0 ? onBody : "Ini juga isi lah"
    try {
      const editNote = await postNote({ token: authToken, title, body })
      await deleteNote({ token: authToken, id: detailNote.id })
      customToast("Successfully changes note", "success", theme)
      setEdit(false)
      navigate(`/detail/${editNote.data.id}`)
    } catch (error) {
      console.error("Error change note", error.message)
    }
  }

  return (
    <>
      <div className="detail-page">
        {loading ? <p className="loading">Loading...</p> : <NoteDetail notes={detailNote} setEdit={setEdit} />}
      </div>
      {edit ? <div className="note-edit">
        <form onSubmit={onEditHandler}>
          <p>{language === "en" ? "Character left" : "Sisa karakter"}: {maxTitleLength - onTitle.length}</p>
          <input type="text" placeholder="Title..." onChange={(e) => setOnTitle(e.target.value)} maxLength={maxTitleLength} value={onTitle} />
          <textarea placeholder="Deskripsi..." onChange={(e) => setOnBody(e.target.value)} value={onBody}></textarea>
          <span>
            <button
              type="submit" disabled={detailNote.title === onTitle && detailNote.body === onBody}>
              <FiEdit />{language === "en" ? "Change" : "Ubah"}</button>
            <button type="button" onClick={() => setEdit(false)}><FiArrowLeft />{language === "en" ? "Back" : "Kembali"}</button>
          </span>
        </form>
      </div> : ""}
    </>
  )
}

export default DetailPage