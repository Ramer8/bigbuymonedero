import { useEffect } from "react"
import axios from "axios"
import { Stack, Pagination } from "@mui/material"
import { orderDateJson, formatMoney } from "../helpers/Operation"

const Formulario = ({
  setDataState,
  dataToShow,
  setDataToShow,
  page,
  setPage,
}) => {
  const valor = 100000
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/movements`
        const { data } = await axios(url)
        const newJson = orderDateJson(data, valor)
        setDataState(newJson) //json ordenado con saldos ant/post
        setDataToShow(newJson)
      } catch (error) {
        console.log(error.message) // se podria agregar msj de error en dom
        setPage(1)
      }
    }
    fetchData()
  }, [])
  const totalobjects = dataToShow.length
  const totalpages = Math.ceil(totalobjects / 5)

  const handleChangePage = (e, valor) => {
    setPage(valor)
  }
  //tres renglones de arriba son de paginacion

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>N° de Pedidos</th>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Importe</th>
            <th>Saldo Ant.</th>
            <th>Saldo Posterior</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((n) => (
            <tr key={n.id}>
              <td> {n.id}</td>
              <td>{n.date}</td>
              <td> {n.concept ? "Retirada" : "Ingreso"} </td>
              <td>{formatMoney(n.amount)}</td>
              <td>{formatMoney(n.saldoAnterior)}</td>
              <td>{formatMoney(n.saldoPosterior)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack spacing={2} sx={{ marginY: 5 }}>
        <Pagination
          count={totalpages}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Stack>
    </>
  )
}

export default Formulario
