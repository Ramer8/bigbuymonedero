import { Typography, Box, Button } from "@mui/material"
// import { useState } from "react"
const SearchDate = ({
  dataToShow,
  handleDate,
  upperDate,
  lowerDate,
  setUpperDate,
  setLowerDate,
}) => {
  // const [upperDate, setUpperDate] = useState("")
  // const [lowerDate, setLowerDate] = useState("")

  const handleUpperDateChange = (event) => {
    setUpperDate(event.target.value)
  }
  const handleLowerDateChange = (event) => {
    setLowerDate(event.target.value)
  }
  console.log(upperDate)
  console.log(lowerDate)

  return (
    <Box sx={{ mt: 1 }}>
      <Typography sx={{ mx: 2 }}>
        desde:
        <input
          type="date"
          id="date"
          value={upperDate}
          onChange={handleUpperDateChange}
        />
      </Typography>
      <Typography sx={{ mt: 1, mx: 2 }}>
        hasta:
        <span> </span>
        <input
          type="date"
          id="date"
          value={lowerDate}
          onChange={handleLowerDateChange}
        />
      </Typography>
      <Button sx={{ mx: 6 }} onClick={handleDate}>
        Buscar
      </Button>
    </Box>
  )
}

export default SearchDate
