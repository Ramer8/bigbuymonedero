import React, { useState } from "react"
import { orderDateJson } from "../helpers/Operation"
import { Stack, Alert } from "@mui/material"
import axios from "axios"
const NewObject = ({
  setDataState,
  dataState,
  concept,
  setToggleMoneyInput,
}) => {
  const [error, setError] = useState({ error: false, text: "" })
  const [newObject, setNewObject] = useState({
    id: "",
    amount: "",
    concept: "",
    date: "",
  })

  const handleInputChange = (event) => {
    setNewObject({
      ...newObject,
      [event.target.name]: Number(event.target.value),
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    // Create a copy of the existing objects array
    const updatedObjects = [...dataState]
    // Generate a new ID y and Date
    // Create a new object with the provided values
    const newObj = {
      ...newObject,
      concept: concept,
      id: dataState.length + 1,
      // id: Math.ceil(new Date() / 100000000),
      date: new Date(Date.now()),
    }
    //Errors
    // Check amount if its positive
    if (newObj.amount === "" || newObj.amount <= 0) {
      setError({ error: true, text: "Ingrese valor mayor a 0" })
      setTimeout(() => {
        setError({ error: false, text: "" })
      }, 3000)
      return
    }

    //Check money balance
    if (newObj.concept && dataState[0].saldoPosterior < newObj.amount) {
      setError({
        error: true,
        text: "Ingrese un valor menor al saldo actual o verifique su saldo disponible",
      })
      setTimeout(() => {
        setError({ error: false, text: "" })
      }, 4000)
      return
    }
    // Add the new object to the array
    updatedObjects.push(newObj)
    //Save and order the new state with new array of objects
    setDataState(orderDateJson(updatedObjects, 100000))
    // Update the state with the new array of objects

    // Opcional guarda objeto nuevo en json con servidor fake.
    function createPost() {
      const baseURL = `http://localhost:3000/movements`
      axios.post(baseURL, newObj).then((response) => {})
    }
    createPost()

    // Reset the form
    setNewObject({ id: "", amount: "", concept: "", date: "" })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder={"ingrese valor"}
          value={newObject.amount}
          onChange={handleInputChange}
        />
        <button type="submit">OK</button>
        <button type="submit" onClick={() => setToggleMoneyInput(false)}>
          X
        </button>
      </form>
      {error.error ? (
        //
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error.text}</Alert>
        </Stack>
      ) : (
        ""
      )}
    </div>
  )
}

export default NewObject
