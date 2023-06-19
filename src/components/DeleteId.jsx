import { useState } from "react"
// Este componente lo hice para practicar borrar un elemento de la lista json. Solo indentifica una entrada por el id y lo muestra
const DeleteId = ({ setDataToShow, dataToShow, dataState }) => {
  //Cuando llamas delete id pasar las props de arriba

  const [id, setId] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(`enviando id ${id}`)
    // Validacion de id
    //puedo hacer la busqueda para ver si existe
    const IdToDelete = dataState.filter((obj) => obj.id.toString().includes(id))
    //verifico q exista por otro metodo de filtrado ese id
    const idd = dataState?.filter((elem) => elem?.id == id)
    console.log(idd)

    console.log(IdToDelete)
    // setDataToShow(IdToDelete)
    //.. continuar
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ingrese id a buscar"
          value={id}
          onChange={(e) => setId(e.target.value)}
          //   onChange={(e) => console.log("escribiendo...")}
        />
        <button type="submit"> send id</button>
      </form>
      {/* <div>
        {dataToShow.map((e) => (
          <div key={e.id}>
            <div>
              <p>{e.id}</p>
              <p>{e.date}</p>
              <p>{e.amount}</p>
              <p>{e.concept ? "retiro" : "ingreso"}</p>
            </div>
          </div>
        ))}
      </div> */}
    </>
  )
}

export default DeleteId
