import React, { useState } from "react"
import { Grid } from "@mui/material"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import IconButton from "@mui/material/IconButton"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

const SearchBar = ({
  setDataToShow,
  dataState,
  setPage,
  filterValue,
  switchFn,
}) => {
  const [userInput, setUserInput] = useState("")
  const [filteredObjects, setFilteredObjects] = useState([])

  const handleInputChange = (event) => {
    const { value } = event.target
    setPage(1)
    setUserInput(value)
    const filtered = dataState.filter((obj) =>
      obj.amount.toString().includes(value)
    )
    setFilteredObjects(filtered)

    const infilter = () =>
      setDataToShow(filteredObjects.filter((e) => e.concept === 0))

    const outfilter = () =>
      setDataToShow(filteredObjects.filter((e) => e.concept === 1))

    const byDefalut = () => setDataToShow(filteredObjects)

    const logFilter = {
      in: infilter,
      out: outfilter,
      default: byDefalut,
    }

    const filterSwitch = switchFn(logFilter, "default")

    filterSwitch(filterValue)
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        item
        xs={"auto"}
        sx={{
          fontWeight: "bold",
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "text.disabled" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          boxShadow: 3,
        }}
      >
        <IconButton type="button" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={userInput}
          onChange={handleInputChange}
          type="number"
        />
        <IconButton
          aria-label="HighlightOffIcon"
          size="small"
          type="submit"
          onClick={() => {
            setDataToShow(dataState), setUserInput("")
          }}
          sx={{
            mx: 1,
            my: 1,
          }}
        >
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      </Grid>
    </div>
  )
}

export default SearchBar
