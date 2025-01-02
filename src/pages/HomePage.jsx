import { useContext, useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { deleteNote, getNotes, postArchiveNote } from "../api";
import { AuthContext } from "../contexts/authContext";
import { useSearchParams } from "react-router-dom";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

function HomePage() {
  const { authToken } = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext)
  const keyword = searchParams.get("keyword") || "";
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const fetchedNotes = await getNotes(authToken)
        setNotes(fetchedNotes.data)
      } catch (error) {
        console.error("Failed to fetch notes", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [authToken])

  const onArchive = async (noteId) => {
    try {
      const fetchedNotes = await postArchiveNote({ token: authToken, id: noteId })
      customToast(fetchedNotes.message || "Archive note successfully", "success", theme)
      const updatedNotes = await getNotes(authToken);
      setNotes(updatedNotes.data);
    } catch (error) {
      console.error("Failed to fetch notes", error.message)
    }
  }

  const onDeleteNote = async (noteId) => {
    try {
      const fetchedNotes = await deleteNote({ token: authToken, id: noteId })
      customToast(fetchedNotes.message || "Note successfully deleted", "success", theme)
      const updatedNotes = await getNotes(authToken);
      setNotes(updatedNotes.data);
    } catch (error) {
      console.error("Failed to fetch notes", error.message)
    }
  }

  const filterByTitle = notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()))

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams({ keyword: value })
  }

  return (
    <section className="home-container">
      <h1>{language === "en" ? "Active Notes" : "Catatan Aktif"}</h1>
      <SearchBar onSearchChange={onSearchChange} onSearch={keyword} />
      {loading ? <p className="loading">Loading...</p> : notes.length > 0 ? <NoteList notes={filterByTitle} onArchive={onArchive} onDelete={onDeleteNote} /> : <p className="loading">{language === "en" ? "No notes available" : "Tidak ada catatan"}</p>}
    </section>
  )
}

export default HomePage