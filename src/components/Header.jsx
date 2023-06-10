import { Button, Typography, Grid, Box } from "@mui/material"

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sm={4} md={4}>
            <Typography component="h1" variant="h6">
              Movimientos
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              component="h1"
              variant="h6"
              align="left"
              color="primary"
              sx={{
                fontWeight: "bold",
              }}
            >
              Saldo Actual: €120.35
            </Typography>
          </Grid>
          <Grid item xs={5} md={4}>
            <Button variant="contained" color="primary">
              Retirar fondos
            </Button>
            <Button variant="contained" color="warning">
              Ingresar fondos
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Header
