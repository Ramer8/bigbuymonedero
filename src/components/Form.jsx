import { useEffect } from "react"
import axios from "axios"
import { Stack, Pagination, colors } from "@mui/material"
import { orderDateJson, formatMoney } from "../helpers/Operation"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const Form = ({ setDataState, dataToShow, setDataToShow, page, setPage }) => {
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
        console.log(error.message)
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
      <Table
        sx={{ minWidth: 650, overflow: "hidden" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ textTransform: "uppercase" }}>
            <TableCell>N° Pedido</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="right">Concepto</TableCell>
            <TableCell align="right">Importe</TableCell>
            <TableCell align="right">Saldo Anterior</TableCell>
            <TableCell align="right">Saldo Posterior</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToShow.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>

              <TableCell align="right">
                {row.concept ? "Retirada" : "Ingreso"}
              </TableCell>
              <TableCell align="right">{formatMoney(row.amount)}</TableCell>
              <TableCell align="right">
                {formatMoney(row.saldoAnterior)}
              </TableCell>
              <TableCell align="right">
                {formatMoney(row.saldoPosterior)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default Form
