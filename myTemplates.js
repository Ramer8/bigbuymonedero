{
  /* 19-06-2023 subido actualizado en github * ya filtra por fecha desde app, cuando filtre por fecha q se siga viendo datos en el formulario
            En simultaneo funciona busqueda de importe con ingreso y egreso
            Empezar con la paginacion y luego el estilado + responsive 
            Luego Testing*/
}

import axios from "axios"
import { useState, useEffect } from "react"

// Ejemplo de busqueda por fecha y hora dentro de un entorno (solo busca por fechas pero tambien discrimina la hora, minutos y segundos de los datos)
const Extra = ({ dataState, setDataToShow, dataToShow }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleInputChange = (event) => {
    const { value } = event.target
    setStartDate(value)
  }

  const handleInputChange2 = (event) => {
    const { value } = event.target
    setEndDate(value)
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate])
  // con esta forma de busqueda funciona con formato fecha 2022-09-16 18:37:50

  //agregar 23:59 a la fecha x q sino toma 00hs y no abarca el dia

  const filter = () => {
    const resultProductData = dataState.filter(
      (a) =>
        new Date(a.date) >= new Date(startDate) &&
        new Date(a.date) <= new Date(`${endDate} 23:59`)

      // return date >= new Date(startDate) && date <= new Date(`${endDate} 23:59`)
    )
    setDataToShow(resultProductData)
    console.log(dataToShow)
  } // esta busqueda si funciona con el template string para la hora, sino no me toma el entorno de un solo dia
  //ahora queda hacerlo andar en el app

  const filter1 = () => {
    const resultProductData1 = dataState.filter((a) => {
      return (
        new Date(a.date) >= new Date(startDate) &&
        new Date(a.date) <= new Date(`${endDate} 23:59`)
      )
    })
    setDataToShow(resultProductData1)
  }

  //filter y filter1 son iguales expresados de distinta manera.
  // Tengo dos input que piden la fecha del entorno, no tiene logica que diga q las fechas start debe ser mas vieja q la end.
  return (
    <div>
      <input
        type="date"
        value={startDate}
        onChange={handleInputChange}
        placeholder="Search by date old"
      />
      Start Date
      <input
        type="date"
        value={endDate}
        onChange={handleInputChange2}
        placeholder="Search by number recently"
      />
      End Date
    </div>
  )
}

export default Extra

/////////////

//Ejemplo de fetch con axios
useEffect(() => {
  const fetchData = async () => {
    try {
      axios.get(`http://localhost:3000/movements`).then((response) => {
        const newJson = orderDateJson(response.data, valor)
        setDataState(newJson) //json ordenado con saldos ant/post
        setDataToShow(newJson)
      })
    } catch (error) {
      setPage(1)
    }
    /// dos formas de hacer fetch con axios (get)
    const url = `http://localhost:3000/movements`
    const { data } = await axios(url)
    const newJson = orderDateJson(data, valor)
    setDataState(newJson) //json ordenado con saldos ant/post
    setDataToShow(newJson)
  }
  fetchData()
}, [])

//////////Ejemplo de fetch post con axios
const baseURL = `http://localhost:3000/movements`

function updatePost() {
  axios
    .put(`${baseURL}/`, {
      // en template string se puede elejir la url donde guardar
      // Esto agrega un objeto al final del json con id
      title: "Hello World!", //correlacionado con los demas objetos del json
      body: "This is an updated post.",
    })
    .then((response) => {
      setPost(response.data)
    })
}
if (!dataState) return "No post!"

function createPost() {
  // otro ejemplo donde agregamos un objeto
  const baseURL = `http://localhost:3000/movements`
  axios.post(baseURL, newObj).then((response) => {
    console.log(response.data)
    setData(response.data)
  })
}
//Opcional boton de update con ej de obj hello world
;<div>
  <h1>{data.title}</h1>
  <p>{data.body}</p>
  <button onClick={updatePost}>Update Post</button>
</div>

//Eliminacion de objeto
///no chequeado
function deletePost() {
  axios.delete(`${baseURL}/1`).then(() => {
    alert("Post deleted!")
    setPost(null)
  })
}

///Format Date no utilizada al final, pasa de formato
//fecha dd/mm/yyyy hh:mm a formato legible string
export const formatDate = (date) => {
  const newDate = new Date(date)
  const options = {
    day: "2-digit",
    hour: "2-digit",
    minutes: "2-digit",
    year: "numeric",
    month: "short",
  }
  return newDate.toLocaleDateString("es-ES", options)
}
