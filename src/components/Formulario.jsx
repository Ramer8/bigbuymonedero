import { useEffect } from "react"
import axios from "axios"
import { orderDateJson, formatMoney } from "../helpers/Operation"
const Formulario = ({ setDataState, dataToShow, setDataToShow }) => {
  const valor = 100000
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3000/movements"
      const { data } = await axios(url)
      const newJson = orderDateJson(data, valor)
      setDataState(newJson)
      setDataToShow(newJson)
    }
    fetchData()
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>N° de Pedidosssssss</th>
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
              <td>
                {n.date.toLocaleString("eu-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td> {n.concept ? "Retirada" : "Ingreso"} </td>
              <td>{formatMoney(n.amount)}</td>
              <td>
                {n.concept
                  ? formatMoney(n.saldoPosterior + n.amount)
                  : formatMoney(n.saldoPosterior - n.amount)}
              </td>
              <td>{formatMoney(n.saldoPosterior)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Formulario
