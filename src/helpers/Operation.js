export const orderDateJson = (objects, Total) => {
  const newDateJson = objects.map((elem) => ({
    ...elem,
    date: new Date(elem.date),
  }))

  const orderedJson = newDateJson.sort((a, b) => a.date - b.date)
  let mainTotal = Total
  const operation = [(a, b) => a + b, (a, b) => a - b]

  const newJson = orderedJson.map((elem) => {
    mainTotal = operation[elem.concept](mainTotal, elem.amount)
    return { ...elem, saldoPosterior: mainTotal }
  })

  return newJson.sort((a, b) => b.date - a.date)
  //oredenado nuevamente de reciente a viejo
}

// Funcion para formatear numero a euro
export const formatMoney = (money) => {
  const euro = money.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  })
  return euro
}

// export const searchDate = (dataState) => {}

// export const formatInitialJson = (oldJson, Total) => {
//   let mainTotal = Total
//   const operation = [(a, b) => a + b, (a, b) => a - b]

//   const newJson = oldJson.map((elem) => {
//     mainTotal = operation[elem.concept](mainTotal, elem.amount)
//     return { ...elem, saldoPosterior: mainTotal }
//   })

//   return newJson
// }

// export const orderDateJson = (objects) => {
//   const newDateJson = objects.map((elem) => {
//     const dateNew = new Date(elem.date)
//     return { ...elem, date: dateNew }
//   })
//   function compareByDate(a, b) {
//     return b.date - a.date
//   }
//   const orderedJson = newDateJson.sort(compareByDate)
//   return orderedJson
// }
