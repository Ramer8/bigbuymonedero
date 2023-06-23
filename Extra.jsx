import { useState, useEffect } from "react"

// esta busqueda dentro de un entorno funciona bien. la del main no, ni por nro ni por fecha
const Extra = ({ dataState }) => {
  const [userInput, setUserInput] = useState("")
  const [userInput2, setUserInput2] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const data = [
    { id: 1, name: "Item 1", date: "2023-06-10 " },
    { id: 2, name: "Item 2", date: "2023-06-11 " },
    { id: 3, name: "Item 3", date: "2023-06-12 " },
    { id: 4, name: "Item 4", date: "2023-06-13 " },
    { id: 5, name: "Item 5", date: "2023-06-14 " },
    { id: 6, name: "Item 6", date: "2023-06-14 " },
    { id: 7, name: "Item 7", date: "2023-06-14 " },
  ]
  //   const data = [
  //     {
  //       id: 3,
  //       amount: 7719,
  //       concept: 0,
  //       date: "Fri Sep 16 2022 21:37:50 GMT+0200 (hora de verano de Europa central)",
  //       saldoPosterior: 14067,
  //     },
  //     {
  //       id: 8,
  //       amount: 7721,
  //       concept: 1,
  //       date: "Fri Sep 16 2022 18:37:50 GMT+0200 (hora de verano de Europa central)",
  //       saldoPosterior: 154067,
  //     },
  //     {
  //       id: 17,
  //       amount: 999,
  //       concept: 0,
  //       date: " Mon Aug 15 2022 21:35:44 GMT+0200 (hora de verano de Europa central)",
  //       saldoPosterior: 152810,
  //     },
  //     {
  //       id: 45,
  //       amount: 8642,
  //       concept: 1,
  //       date: "Thu Aug 11 2022 09:30:32 GMT+0200 (hora de verano de Europa central)",
  //       saldoPosterior: 151811,
  //     },
  //     {
  //       id: 23,
  //       amount: 6462,
  //       concept: 1,
  //       date: "Mon Aug 22 2022 21:36:43 GMT+0200 (hora de verano de Europa central)",
  //       saldoPosterior: 146348,
  //     },
  //   ]
  const handleInputChange = (event) => {
    const { value } = event.target
    setUserInput(value)
  }

  const handleInputChange2 = (event) => {
    const { value } = event.target
    setUserInput2(value)
  }
  useEffect(() => {
    filter()
  }, [userInput2, userInput])

  const filter = () => {
    const filtered = data.filter(
      (dato) => dato.id <= userInput2 && dato.id >= userInput
    )

    console.log(filtered)
  }

  return (
    <div>
      <input
        type="id"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Search by date old"
      />
      1
      <input
        type="id"
        value={userInput2}
        onChange={handleInputChange2}
        placeholder="Search by number recently"
      />
      2
      {/* <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.id} - {item.date}
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default Extra
