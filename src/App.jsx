import CssBaseline from "@mui/material/CssBaseline"
import { useState, useEffect } from "react"
import { Container, Grid, Typography } from "@mui/material"

import { useMemo } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Header from "./components/header"
import Filter from "./components/Filter"
import SearchBar from "./components/SearchBar"
import FilterByDate from "./components/FilterByDate"
import Form from "./components/Form"

function App() {
  const [balance, setBalance] = useState("")
  const [dataState, setDataState] = useState([])
  const [dataToShow, setDataToShow] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [toggleDate, setToggleDate] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    setToggleDate(false)
    const infilter = () =>
      setDataToShow(dataState.filter((e) => e.concept === 0))
    const outfilter = () =>
      setDataToShow(dataState.filter((e) => e.concept === 1))
    const datefilter = () => {
      setToggleDate(true), setDataToShow(dataState)
    }
    const byDefalut = () => setDataToShow(dataState)
    const logFilter = {
      in: infilter,
      out: outfilter,
      date: datefilter,
      default: byDefalut,
    }
    const filterSwitch = switchFn(logFilter, "default")

    filterSwitch(filterValue)
  }, [filterValue, dataState])

  useEffect(() => {
    const obtenerLS = () => {
      const dataStateLS = JSON.parse(localStorage.getItem("dataState")) ?? []
      setDataState(dataStateLS)
    }
    obtenerLS()
  }, [])

  useEffect(() => {
    localStorage.setItem("dataState", JSON.stringify(dataState))
  }, [dataState])

  useEffect(() => {
    setPage(1)
  }, [filterValue])

  const switchFn =
    (lookupObject, defaultCase = "_default") =>
    (expression) =>
      (lookupObject[expression] || lookupObject[defaultCase])()

  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value)
  }

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          width: "auto",
          borderRadius: 2,
          boxShadow: 3,
          margin: "auto",
          paddingX: "25px",
          marginY: "25px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.900" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.400" : "grey.800",
        }}
      >
        <Header
          dataState={dataState}
          setDataState={setDataState}
          dataToShow={dataToShow}
          balance={balance}
        />

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <SearchBar
            switchFn={switchFn}
            filterValue={filterValue}
            setDataToShow={setDataToShow}
            dataState={dataState}
            setPage={setPage}
          />
          <Filter
            handleChangeFilter={handleChangeFilter}
            filterValue={filterValue}
          />
          {toggleDate && (
            <>
              <FilterByDate
                dataState={dataState}
                setDataToShow={setDataToShow}
                dataToShow={dataToShow}
              />
            </>
          )}
        </Grid>
        <Typography component="h2" variant="h6">
          <Form
            setBalance={setBalance}
            filterValue={filterValue}
            page={page}
            setPage={setPage}
            dataState={dataState}
            setDataState={setDataState}
            dataToShow={dataToShow}
            setDataToShow={setDataToShow}
            dataShow={dataShow}
            setDataShow={setDataShow}
          />
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

export default App
