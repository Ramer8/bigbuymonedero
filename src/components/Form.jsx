import { useEffect } from "react"
import axios from "axios"
import { Stack, Pagination } from "@mui/material"
import { orderDateJson, formatMoney } from "../helpers/Operation"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

const Form = ({
  setDataState,
  dataToShow,
  setDataToShow,
  page,
  setPage,
  setBalance,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlDataBase = `http://localhost:3000/movements`
        const urlBalance = `http://localhost:3000/balance`
        const { data } = await axios(urlDataBase)
        const dataBalance = await axios(urlBalance)
        const newBalance = dataBalance.data[0].balance
        setBalance(newBalance)
        const newJson = orderDateJson(data, newBalance)
        setDataState(newJson)
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

  const handleChangePage = (e, value) => {
    setPage(value)
  }

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
                {formatMoney(row.previousBalance)}
              </TableCell>
              <TableCell align="right">
                {formatMoney(row.subsequentBalance)}
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
