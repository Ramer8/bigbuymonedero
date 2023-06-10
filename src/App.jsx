import { useState, useEffect } from "react"
import { Container, Typography } from "@mui/material"
import Header from "./components/header"
import Formulario from "./components/Formulario"

import { useMemo } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Filter from "./components/Filter"
import SearchDate from "./components/SearchDate"

function App() {
  const [dataState, setDataState] = useState([])
  const [dataToShow, setDataToShow] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [modal, setModal] = useState(false)
  const [rangeDate, setRangeDate] = useState(false)

  const [upperDate, setUpperDate] = useState("")
  const [lowerDate, setLowerDate] = useState("")

  useEffect(() => {
    if (filterValue === "Ingreso") {
      const newState = dataState.filter((e) => e.concept === 0)
      console.log(newState)
      setDataToShow(newState)
      setModal(false)
    } else if (filterValue === "Retirada") {
      const newState = dataState.filter((e) => e.concept === 1)
      console.log(newState)
      setDataToShow(newState)
      setModal(false)
    } else if (filterValue === "Fecha") {
      // const newState = dataState.filter((e) => e.fecha === rangeDate)
      setModal(true)
      console.log("fecha")
    } else {
      setDataToShow(dataState)
      setModal(false)
    }
  }, [filterValue, dataState])

  useEffect(() => {
    console.log("object")
  }, [rangeDate])

  // useEffect(() => {
  //   const obtenerLS = () => {
  //     const dataStateLS = JSON.parse(localStorage.getItem('dataState')) ?? [];
  //     setDataState(dataStateLS)
  //   }
  //   obtenerLS();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('dataState', JSON.stringify(dataState));
  // }, [dataState])

  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value)
    console.log(filterValue)
  }
  const handleDate = () => {
    setRangeDate(true)
    console.log({ upperDate, lowerDate })
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
        <Header />
        <Typography
          component="h1"
          variant="h6"
          align="left"
          marginY={1}
          sx={{
            fontWeight: "bold",
          }}
        >
          Barra de busqueda
        </Typography>
        <Filter
          handleChangeFilter={handleChangeFilter}
          filterValue={filterValue}
        />
        {/* {modal && <Modal modal={modal} />} */}
        {modal && (
          <SearchDate
            handleDate={handleDate}
            dataToShow={dataToShow}
            lowerDate={lowerDate}
            setLowerDate={setLowerDate}
            upperDate={upperDate}
            setUpperDate={setUpperDate}
          />
        )}
        <Formulario
          setDataState={setDataState}
          dataToShow={dataToShow}
          setDataToShow={setDataToShow}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
