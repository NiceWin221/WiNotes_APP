import { useContext, useEffect, useState } from "react";
import { deleteNote, getArchivedNotes, postUnArchiveNote } from "../api";
import { AuthContext } from "../contexts/authContext";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import customToast from "../utils/toastUtil";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

function ArchivedPage() {
  const [archivedNote, setArchivedNote] = useState([])
  const [loading, setLoading] = useState(false)
  const { authToken } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { theme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const response = await getArchivedNotes(authToken)
        setArchivedNote(response.data)
      } catch (error) {
        console.error("Error fetching archived notes", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [authToken])

  const onUnArchive = async (noteId) => {
    try {
      const fetchedNotes = await postUnArchiveNote({ token: authToken, id: noteId })
      customToast(fetchedNotes.message || "unArchive note successfully", "success", theme)
      const updatedNotes = await getArchivedNotes(authToken);
      setArchivedNote(updatedNotes.data);
    } catch (error) {
      console.error("Failed to fetch notes", error.message)
    }
  }

  const onDeleteNote = async (noteId) => {
    try {
      const fetchedNotes = await deleteNote({ token: authToken, id: noteId })
      customToast(fetchedNotes.message || "Note successfully deleted", "success", theme)
      const updatedNotes = await getArchivedNotes(authToken);
      setArchivedNote(updatedNotes.data);
    } catch (error) {
      console.error("Failed to fetch notes", error.message)
    }
  }

  const filterByTitle = archivedNote.filter((note) => note.title.toLowerCase().includes(keyword.toLocaleLowerCase()))

  const onSearchChange = (e) => {
    const value = e.target.value
    setSearchParams({ keyword: value })
  }

  return (
    <div className="archived-page">
      <h1>{language === "en" ? "Archived Notes" : "Catatan Arsip"}</h1>
      <SearchBar onSearch={keyword} onSearchChange={onSearchChange} />
      {loading ? <p className="loading">Loading...</p> : archivedNote.length > 0 ? <NoteList notes={filterByTitle} onUnArchive={onUnArchive} onDelete={onDeleteNote} /> : <p className="loading">{language === "en" ? "No notes available" : "Tidak ada catatan"}</p>}
    </div>
  )
}

export default ArchivedPage