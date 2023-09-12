import React, { useState } from "react"
import { orderDateJson } from "../helpers/Operation"
import NestedModal from "./Modal"
import axios from "axios"

const NewTransaction = ({
  setDataState,
  dataState,
  concept,
  open,
  setOpen,
  balance,
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

    const updatedObjects = [...dataState]
    const newObj = {
      ...newObject,
      concept,
      id: dataState.length + 1,
      date: new Date(),
    }
    if (newObj.amount === "" || newObj.amount <= 0) {
      setError({ error: true, text: "Ingrese valor mayor a 0" })
      setTimeout(() => {
        setError({ error: false, text: "" })
      }, 3000)
      return
    }

    if (newObj.concept && dataState[0].subsequentBalance < newObj.amount) {
      setError({
        error: true,
        text: "Ingrese un valor menor al saldo actual o verifique su saldo disponible",
      })
      setTimeout(() => {
        setError({ error: false, text: "" })
      }, 4000)
      return
    }
    updatedObjects.push(newObj)
    setDataState(orderDateJson(updatedObjects, balance))
    function createPost() {
      const baseURL = `http://localhost:3000/movements`
      axios.post(baseURL, newObj).then((response) => {})
    }
    createPost()
    setNewObject({ id: "", amount: "", concept: "", date: "" })

    setTimeout(() => {
      setOpen(false)
    }, 700)
  }
  return (
    <div>
      <NestedModal
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        newObject={newObject}
        concept={concept}
        open={open}
        setOpen={setOpen}
      ></NestedModal>
    </div>
  )
}

export default NewTransaction
