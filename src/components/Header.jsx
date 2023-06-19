import { Button, Typography, Grid, Box } from "@mui/material"
import { formatMoney } from "../helpers/Operation"
import NewObject from "./NewObject"
import { useState } from "react"
const Header = ({ dataState, setDataState, dataToShow, setDataToShow }) => {
  const [toggleMoneyInput, setToggleMoneyInput] = useState(false)

  const [concept, setConcept] = useState()
  const handleTakeMoneyOut = (e) => {
    setToggleMoneyInput(true)
    setConcept(1)
  }
  const handleDepositMoney = (e) => {
    setToggleMoneyInput(true)
    setConcept(0)
  }
  let saldo = ""
  // Sorting the array of objects by recent date to get the latest balance
  // I will should set balance in state to have independient result of the filters
  const orderedDate = () => {
    function compareByRecentDate(a, b) {
      return b.date - a.date
    }
    dataState?.sort(compareByRecentDate)
    saldo = dataState[0]?.saldoPosterior
  }
  orderedDate()

  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item></Grid>
          <Grid item xs={4}>
            <Typography component="h1" variant="h6">
              Movimientos to zip
            </Typography>
            <Typography
              sx={{ mx: 7, fontWeight: "bold" }}
              component="h1"
              variant="h6"
              align="left"
              color="primary"
            >
              {saldo && saldo !== 0
                ? `Saldo Actual, ${formatMoney(saldo)}`
                : "No hay saldo disponible"}
            </Typography>
          </Grid>
          <Grid item xs={5} md={4} sx={{ mx: 4 }}>
            <Button
              sx={{ mt: 2, mx: 2 }}
              variant="contained"
              color="primary"
              onClick={handleTakeMoneyOut}
            >
              Retirar fondos
            </Button>

            <Button
              sx={{ mt: 2, mx: 2 }}
              variant="contained"
              color="warning"
              onClick={handleDepositMoney}
            >
              Ingresar fondos
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2 }} variant="contained" color="warning">
        {toggleMoneyInput && (
          <NewObject
            setToggleMoneyInput={setToggleMoneyInput}
            concept={concept}
            dataState={dataState}
            setDataState={setDataState}
          />
        )}
      </Box>
    </>
  )
}

export default Header
