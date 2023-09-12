export const orderDateJson = (objects, Total) => {
  const newDateJson = objects.map((elem) => ({
    ...elem,
    date: new Date(elem.date),
  }))

  const orderedJson = newDateJson.sort((a, b) => a.date - b.date)
  let mainTotal = Total
  let previousBalance = ""
  const operation = [(a, b) => a + b, (a, b) => a - b]

  const newJson = orderedJson.map((elem) => {
    mainTotal = operation[elem.concept](mainTotal, elem.amount)

    elem.concept && (previousBalance = mainTotal + elem.amount)
    !elem.concept && (previousBalance = mainTotal - elem.amount)

    return {
      ...elem,
      subsequentBalance: mainTotal,
      previousBalance,
    }
  })
  const orderedJson2 = newJson.sort((a, b) => b.date - a.date)
  const newDateJson3 = orderedJson2.map((elem) => ({
    ...elem,
    date: elem.date.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2"),
  }))
  return newDateJson3
}

export const formatMoney = (money) => {
  const euro = money.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  })
  return euro
}
