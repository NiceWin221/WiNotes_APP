import { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthContext } from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { ToastContainer } from "react-toastify"
import MainLayout from "./layouts/MainLayout"
import DetailPage from "./pages/DetailPage"
import ArchivedPage from "./pages/ArchivedPage"
import NoteInputPage from "./pages/NoteInputPage"
import LostPage from "./pages/LostPage"
import ForgotPage from "./pages/ForgotPage"

function App() {
  const { authToken, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <MainLayout>
        <Routes>
          <Route path="/register" element={authToken ? <Navigate to="/" /> : <RegisterPage />} />
          <Route path="/login" element={authToken ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={authToken ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/detail/:id" element={authToken ? <DetailPage /> : <Navigate to="/login" />} />
          <Route path="/archive" element={authToken ? <ArchivedPage /> : <Navigate to="/login" />} />
          <Route path="/add" element={authToken ? <NoteInputPage /> : <Navigate to="/login" />} />
          <Route path="*" element={authToken ? <LostPage /> : <Navigate to="/login" />} />
          <Route path="/forgot" element={<ForgotPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
