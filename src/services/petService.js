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
    // if (json.token) {
    //   tokenService.setToken(json.token)

    // }
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