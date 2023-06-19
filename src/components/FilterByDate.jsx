import { useState, useEffect } from "react"
import { Stack, Alert } from "@mui/material"

const FilterByDate = ({ dataState, setDataToShow, dataToShow }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (event) => {
    const { value } = event.target
    setStartDate(value)
  }
  const handleInputChange2 = (event) => {
    const { value } = event.target
    setEndDate(value)
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate])

  // Con esta forma de busqueda funciona con formato fecha 2022-09-16 18:37:50
  // Agregar 23:59 a la fecha x q sino toma 00hs y no abarca el dia

  let resultProductData = ""
  const filter = () => {
    resultProductData = dataState.filter(
      (a) =>
        new Date(a.date) >= new Date(startDate) &&
        new Date(a.date) <= new Date(`${endDate} 23:59`)
    )
    if (resultProductData.length === 0 && startDate !== "" && endDate !== "") {
      setError("No existen datos en la fecha seleccionada")
      setTimeout(() => {
        setError("")
      }, 5000)
    }
    setDataToShow(resultProductData)
    return
  }

  return (
    <div>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleInputChange}
      />
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleInputChange2}
      />
      <label htmlFor="endDate">End Date</label>
      <button
        type="submit"
        onClick={() => {
          setStartDate(""), setEndDate(""), setDataToShow(dataState)
        }}
      >
        BORRAR FECHAS
      </button>
      {error ? (
        //
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      ) : (
        ""
      )}
    </div>
  )
}

export default FilterByDate
