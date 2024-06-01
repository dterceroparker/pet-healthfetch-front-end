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

async function show(petId) {
  try {
    const res = await fetch(`${BASE_URL}/${petId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
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
    console.log({res})
    const json = await res.json()
    console.log({json})
    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.setToken(json.token)

      if (photoData) {
        await addPhoto(photoData, json._id)
      }
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
    console.log(photoFormData)
    const res = await fetch(`${BASE_URL}/${petId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function deletePhoto(photoIdx, petId) {
  try {
    const res = await fetch(`${BASE_URL}/${petId}/delete-photo/${photoIdx}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export {
  index,
  show,
  create,
  update,
  addPhoto,
  deletePhoto,
}