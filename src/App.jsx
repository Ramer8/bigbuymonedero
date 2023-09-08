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
// import StickyHeadTable from "./components/Table"
import BasicTable from "./components/Table1"

function App() {
  const [dataState, setDataState] = useState([])
  const [dataToShow, setDataToShow] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [toggleDate, setToggleDate] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    setToggleDate(false)
    switch (filterValue) {
      case "in":
        setDataToShow(dataState.filter((e) => e.concept === 0))
        break
      case "out":
        setDataToShow(dataState.filter((e) => e.concept === 1))
        break
      case "date":
        setToggleDate(true)
        setDataToShow(dataState)
        break
      default:
        setDataToShow(dataState)
    }
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
        />

        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <SearchBar
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
        {/* <StickyHeadTable /> */}
        <Typography component="h2" variant="h6">
          <Form
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
      <BasicTable></BasicTable>
    </ThemeProvider>
  )
}

export default App
