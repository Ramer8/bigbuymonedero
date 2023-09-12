import { Button, Typography, Grid, Box } from "@mui/material"
import { formatMoney } from "../helpers/Operation"
import SyncAltIcon from "@mui/icons-material/SyncAlt"
import { useState } from "react"
import NewTransaction from "./NewTransaction"

const Header = ({ dataState, setDataState, balance }) => {
  const [open, setOpen] = useState(false)
  const [concept, setConcept] = useState()

  const handleTakeMoneyOut = (e) => {
    setOpen(true)
    setConcept(1)
  }
  const handleDepositMoney = (e) => {
    setOpen(true)
    setConcept(0)
  }
  let newBalance = ""

  const orderedDate = () => {
    function compareByRecentDate(a, b) {
      return b.date - a.date
    }
    dataState?.sort(compareByRecentDate)
    newBalance = dataState[0]?.subsequentBalance
  }
  orderedDate()

  return (
    <>
      <Grid
        spacing={0}
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Typography
            component="h1"
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            <SyncAltIcon
              sx={{
                margin: "8px",
                marginY: "-4px",
                borderRadius: 2,
              }}
            />{" "}
            Movimientos
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          item
          md={10}
        >
          <Typography
            sx={{ mx: 1 }}
            component="h1"
            variant="h6"
            align="center"
            color="primary"
          >
            {newBalance && newBalance !== 0 ? (
              <Grid container sx={{ mx: 2 }}>
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ mx: 1, fontWeight: 700 }}
                >
                  Saldo actual:
                </Typography>

                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ fontWeight: 100 }}
                >
                  {formatMoney(newBalance)}
                </Typography>
              </Grid>
            ) : (
              "No hay saldo disponible"
            )}
          </Typography>
          <Button
            sx={{
              textTransform: "none",
              mx: 1,
              my: 1,
              backgroundColor: "#0090FF",
              color: "white",
            }}
            variant="contained"
            color="primary"
            onClick={handleTakeMoneyOut}
          >
            Retirar fondos
          </Button>
          <Button
            sx={{
              mx: 1,
              my: 1,
              textTransform: "none",
              backgroundColor: "#FFCE33",
              color: "#464E5F",
            }}
            xs={1}
            variant="contained"
            color="warning"
            onClick={handleDepositMoney}
          >
            Ingresar fondos
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }} variant="contained" color="warning">
        {open && (
          <NewTransaction
            concept={concept}
            dataState={dataState}
            setDataState={setDataState}
            open={open}
            setOpen={setOpen}
            balance={balance}
          />
        )}
      </Box>
    </>
  )
}

export default Header
