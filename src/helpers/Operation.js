export const orderDateJson = (objects, total) => {
  const newDateJson = objects.map((elem) => ({
    ...elem,
    date: new Date(elem.date),
  }))

  const orderedJsonByDate = newDateJson.sort(
    (dateA, dateB) => dateA.date - dateB.date
  )
  let previousBalance = ""
  const operation = [
    (dateA, dateB) => dateA + dateB,
    (dateA, dateB) => dateA - dateB,
  ]

  const newJson = orderedJsonByDate.map((elem) => {
    total = operation[elem.concept](total, elem.amount)
    elem.concept && (previousBalance = total + elem.amount)
    !elem.concept && (previousBalance = total - elem.amount)

    return {
      ...elem,
      subsequentBalance: total,
      previousBalance,
    }
  })
  const orderedJson2 = newJson.sort((dateA, dateB) => dateB.date - dateA.date)
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
