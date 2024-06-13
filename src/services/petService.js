import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/pets`

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function show(petId) {
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
     // Check for successful response status code (e.g., 200 OK)
      if (!res.ok) {
      throw new Error(`Error fetching pet details: ${res.status}`)
    }
    const json = await res.json()
    // Log the entire response (for debugging)
    console.log("API response for pet details:", json) 
    return json
  } catch (error) {
    console.error("Error fetching pet details:", error)
    throw error
  }
}

async function create(petFormData, photoData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petFormData)
    })
    const json = await res.json()
    if (json.err) throw new Error(json.err)
    if (photoData) {
      await addPhoto(photoData, json._id)
    }
    return json
  } catch (error) {
    console.log(error)
  }
}

async function update(petFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${petFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function addPhoto(photoData, petId) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const res = await fetch(`${BASE_URL}/${petId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    const json = res.json()
    return json
  } catch (err) {
    throw new Error(err)
  }
}

async function createVisit(visitFormData, petId, photoData) {
  try {
    const res = await fetch(`${BASE_URL}/${petId}/visits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visitFormData)
    })
    const json = await res.json()
    if (json.err) throw new Error(json.err)
    if (photoData) {
      // Extract visitId from the response
      const visitId = json._id 
      await addVisitPhoto(visitId, petId, photoData)
    }
    return json
  } catch (error) {
    console.error('Error creating visit:', error)
  }
}

async function addVisitPhoto(visitId, petId, photoData ) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const res = await fetch(`${BASE_URL}/${petId}/visits/${visitId}/add-visit-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: photoFormData,
    })
    const json = res.json();
    return json
  } catch (err) {
    throw new Error(err)
  }
}

const updateVisit = async (petId, visitFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${petId}/visits`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visitFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteVisit = async (petId, visitId) => {
  try {
    const res = await fetch(`${BASE_URL}/${petId}/visits/${visitId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  addPhoto,
  create,
  index,
  show,
  update,

  addVisitPhoto,
  createVisit,
  deleteVisit,
  updateVisit
}