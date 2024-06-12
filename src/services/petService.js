// services
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

// async function show(petId) {
//   try {
//     const res = await fetch(`${BASE_URL}/${petId}`, {
//       headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
//     })
//     return res.json()
//   } catch (error) {
//     console.log(error)
//   }
// }

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
    console.log("API response for pet details:", json) // Log the entire response (for debugging)
    return json
  } catch (error) {
    console.error("Error fetching pet details:", error) // Log the error details
    throw error; // Re-throw the error for handling in the calling component
  }
}


async function create(petFormData, photoData) {
  try {
    console.log("PETSERVICE.CREATE", {petFormData, photoData})
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petFormData)
    })
    const json = await res.json()
    console.log("JSON FROM PETSERVICE.CREATE", {json})
    if (json.err) throw new Error(json.err)

    if (photoData) {
      console.log("CALLING ADDPHOTO WITH", {photoData, id: json._id})
      await addPhoto(photoData, json._id)
    }
    return json
  } catch (error) {
    console.log(error)
  }
}

async function update(petFormData) {
  try {
    console.log("first update", {petFormData: petFormData})
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
    console.log("INSIDE ADDPHOTO WITH", {photoData, petId})
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    console.log("GOING TO SEND TO BACKEND", {photoFormData, petId})
    const res = await fetch(`${BASE_URL}/${petId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    const json = res.json();

    console.log("RESULT OF ADDPHOTO", {json})

    return json
  } catch (err) {
    throw new Error(err)
  }
}

async function createVisit(visitFormData, petId, photoData) {
  try {
    console.log("** Provided createVisit pet ID:**", petId)
    const res = await fetch(`${BASE_URL}/${petId}/visits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visitFormData)
    })
    const json = await res.json()
    console.log("JSON FROM PETSERVICE.CREATEVISIT", {json})
    if (json.err) throw new Error(json.err)

    if (photoData) {
      console.log("CALLING ADDVISITPHOTO WITH", {photoData, id: json._id})
      await addPhoto(photoData, json._id)
    }
    return json
  } catch (error) {
    console.log(error)
  }
}

async function addVisitPhoto(photoData, petId) {
  try {
    console.log("[ADD VISIT PHOTO]", "INSIDE ADDVISITPHOTO WITH", {photoData, petId})
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    console.log("[ADD VISIT PHOTO]", "GOING TO SEND TO BACKEND", {photoFormData, petId})
    const res = await fetch(`${BASE_URL}/${petId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: photoFormData,
    })
    const json = res.json();
    console.log("[ADD VISIT PHOTO]", "RESULT OF ADDVISITPHOTO", {json})
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
  index,
  show,
  create,
  update,
  addPhoto,

  createVisit,
  addVisitPhoto,
  updateVisit,
  deleteVisit,
}