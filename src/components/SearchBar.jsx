import React, { useState } from "react"

const SearchBar = ({ setDataToShow, dataState, setPage, filterValue }) => {
  const [userInput, setUserInput] = useState("")
  const [filteredObjects, setFilteredObjects] = useState([])

  const handleInputChange = (event) => {
    const { value } = event.target
    setPage(1)
    setUserInput(value)
    // Filter by amount
    const filtered = dataState.filter((obj) =>
      obj.amount.toString().includes(value)
    )
    setFilteredObjects(filtered)
    // Check if data exist and check anothers filters

    if (filteredObjects.length == "") {
      // filtro por concepto 'ingreso' dentro de la barra de busqueda
    } else if (filterValue === "Ingreso") {
      const newState = filteredObjects.filter((e) => e.concept === 0)
      setDataToShow(newState)

      // filtro por concepto egreso dentro de la barra de busqueda
    } else if (filterValue === "Retirada") {
      const newState = filteredObjects.filter((e) => e.concept === 1)
      setDataToShow(newState)

      // filtra solo por cantidad
    } else if (filterValue === "") {
      setDataToShow(filteredObjects)
    }
  }
  return (
    <div>
      <input
        type="number"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Buscar por Importe"
      />
      <button
        type="submit"
        onClick={() => {
          setDataToShow(dataState), setUserInput("")
        }}
      >
        REINICIAR
      </button>
    </div>
  )
}

export default SearchBar
