// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Logout from './pages/Logout/Logout'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Profiles from './pages/Profiles/Profiles'
import PetList from './pages/PetList/PetList'
import PetDetails from './pages/PetDetails/PetDetails'
import NewPet from './pages/NewPet/NewPet'
import EditPet from './pages/EditPet/EditPet'
import NewVisit from './pages/NewVisit/NewVisit'
import EditVisit from './pages/EditVisit/EditVisit'

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

  const handleAddPet = async (petFormData, photoData) => {
    console.log({petFormData, photoData})
    const newPet = await petService.create(petFormData, photoData)
    console.log({newPet})
    setPets([newPet, ...pets])
    navigate('/pets')
  }

  const handleUpdatePet = async (petFormData) => {
    const updatedPet = await petService.update(petFormData)
    setPets(pets.map((pet) => updatedPet._id === pet._id ? updatedPet : pet))
    navigate('/pets')
  }

  const handleAddVisit = async (visitFormData, petId, photoData) => {
    console.log("** App.jsx handleAddVisit:**", visitFormData, petId, photoData)
    try {
      await petService.createVisit(visitFormData, petId, photoData)
      console.log("** Adding visit for pet")
      navigate(`/pets/${petId}`)
    } catch (error) {
      console.error('Error adding visit:', error)
      // Display an error message to the user
    }
  }


  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/logout" element={<Logout />} 
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
          path="/pets/:petId/visits/new"
          element={
            <ProtectedRoute user={user}>
              <NewVisit 
              handleAddVisit={handleAddVisit}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:petId/visits/edit"
          element={
            <ProtectedRoute user={user}>
              <EditVisit 
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:petId"
          element={
            <ProtectedRoute user={user}>
              <PetDetails user={user} 
        />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/new"
          element={
            <ProtectedRoute user={user}>
              <NewPet 
              handleAddPet={handleAddPet}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/edit"
          element={
            <ProtectedRoute user={user}>
              <EditPet handleUpdatePet={handleUpdatePet}/>
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
      </Routes>
    </>
  )
}

export default App
