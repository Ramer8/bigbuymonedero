import { InputLabel, FormControl, Select, MenuItem } from "@mui/material"

const Filter = ({ handleChangeFilter, filterValue }) => {
  const Filtrar = [
    { value: "Fecha" },
    { value: "Ingreso" },
    { value: "Retirada" },
  ]

  return (
    <>
      <form>
        <FormControl>
          <InputLabel>Filtrar</InputLabel>
          <Select
            label="Filtrar"
            onChange={handleChangeFilter}
            value={filterValue}
            sx={{ width: 130, fontWeight: "bold", variant: "contained" }}
          >
            <MenuItem value="">
              <em> - </em>
            </MenuItem>
            <MenuItem value={"Fecha"}>Fecha</MenuItem>
            <MenuItem value={"Ingreso"}>Ingreso</MenuItem>
            <MenuItem value={"Retirada"}>Retirada</MenuItem>
          </Select>
        </FormControl>
      </form>
    </>
  )
}

export default Filter
