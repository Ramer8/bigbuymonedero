import { InputLabel, FormControl, Select, MenuItem } from "@mui/material"

const Filter = ({ handleChangeFilter, filterValue }) => {
  return (
    <>
      <form>
        <FormControl
          sx={{
            marginX: 1,
            borderRadius: 2,
            backgroundColor: "#1e88e5",
          }}
        >
          <InputLabel
            sx={{
              paddingX: 2,
              color: "white",
              fontWeight: "bold ",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M17.4291 1.72122L11.1663 7.98164V16.8535C11.1663 17.5139 10.4216 17.8931 9.88805 17.519L7.17982 15.6233C7.07279 15.5484 6.9854 15.4488 6.92505 15.3329C6.86471 15.217 6.83319 15.0883 6.83317 14.9577V7.98401L0.570378 1.72122C0.0625837 1.20903 0.424471 0.333252 1.14588 0.333252H16.8536C17.5757 0.333252 17.9369 1.21004 17.4291 1.72122Z"
                  fill="white"
                />
              </g>
            </svg>{" "}
            Filtrar
          </InputLabel>
          <Select
            label="Filter"
            onChange={handleChangeFilter}
            value={filterValue}
            variant="standard"
            inputlabelprops={{
              shrink: false,
            }}
            sx={{ width: 130, marginX: 2 }}
          >
            <MenuItem value="">
              <em> - </em>
            </MenuItem>
            <MenuItem value={"date"}>Fecha</MenuItem>
            <MenuItem value={"in"}>Ingreso</MenuItem>
            <MenuItem value={"out"}>Retirada</MenuItem>
          </Select>
        </FormControl>
      </form>
    </>
  )
}

export default Filter
