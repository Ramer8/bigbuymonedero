import { useState, useEffect } from "react"
import { Container, Typography } from "@mui/material"
import Header from "./components/header"
import Formulario from "./components/Formulario"

import { useMemo } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Filter from "./components/Filter"
import SearchBar from "./components/SearchBar"
import FilterByDate from "./components/FilterByDate"

function App() {
  const [dataState, setDataState] = useState([])
  const [dataToShow, setDataToShow] = useState([])
  const [dataShow, setDataShow] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [toggleDate, setToggleDate] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (filterValue === "Ingreso") {
      const newState = dataState.filter((e) => e.concept === 0)
      setDataToShow(newState)
      setToggleDate(false)
    } else if (filterValue === "Retirada") {
      const newState = dataState.filter((e) => e.concept === 1)
      setDataToShow(newState)
      setToggleDate(false)
    } else if (filterValue === "Fecha") {
      setToggleDate(true)
      setDataToShow(dataState)
    } else {
      setDataToShow(dataState)
      setToggleDate(false)
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
      <Container>
        <Header
          dataState={dataState}
          dataToShow={dataToShow}
          setDataToShow={setDataToShow}
          setDataState={setDataState}
        />
        <SearchBar
          filterValue={filterValue}
          setDataToShow={setDataToShow}
          dataState={dataState}
          setPage={setPage}
        />
        <span> - </span>
        <Filter
          handleChangeFilter={handleChangeFilter}
          filterValue={filterValue}
        />
        <span> - </span>
        {toggleDate && (
          <>
            <FilterByDate
              dataState={dataState}
              setDataToShow={setDataToShow}
              dataToShow={dataToShow}
            />
          </>
        )}
        <Typography component="h2" variant="h6">
          <Formulario
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
