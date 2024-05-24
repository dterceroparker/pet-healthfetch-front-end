// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import PetList from './pages/PetList/PetList'
import PetDetails from './pages/PetDetails/PetDetails'
import NewPet from './pages/NewPet/NewPet'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as petService from './services/petService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [pets, setPets] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchAllPets = async () => {
      const petsData = await petService.index()
      setPets(petsData) 
    }
    if (user) fetchAllPets()
  }, [user])

  const handleAddPet = async formData => {
    const newPet = await petService.create(formData)
    setPets([newPet, ...pets])
    navigate('/pets')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" 
          element={
          <Landing user={user} />} 
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>}
        />
        <Route
          path="/auth/signup"
          element={
          <Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={
          <Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute user={user}>
              <PetList pets={pets} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:petId"
          element={
            <ProtectedRoute user={user}>
              <PetDetails user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/new"
          element={
            <ProtectedRoute user={user}>
              <NewPet handleAddPet={handleAddPet}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
