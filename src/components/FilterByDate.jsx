import { useState, useEffect } from "react"
import { Stack, Alert, TextField } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

const FilterByDate = ({ dataState, setDataToShow }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")

  const handleInputChangeStartDate = (event) => {
    const { value } = event.target
    setStartDate(value)
  }
  const handleInputChangeEndDate = (event) => {
    const { value } = event.target
    setEndDate(value)
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate])

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
      <TextField
        label="Start Date"
        variant="outlined"
        type="date"
        id="startDate"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={handleInputChangeStartDate}
        sx={{ marginX: "20px" }}
      />

      <TextField
        label="End Date"
        variant="outlined"
        type="date"
        id="endDate"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={handleInputChangeEndDate}
      />
      <IconButton
        aria-label="DeleteIcon"
        size="small"
        color="primary"
        type="submit"
        onClick={() => {
          setStartDate(""), setEndDate(""), setDataToShow(dataState)
        }}
        sx={{
          mx: 1,
          my: 1,
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      {error ? (
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
