import { data } from "../mocks/data.json"

export const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

export const getMockedData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCKED_DATA)
    }, 2000)
  })

// ESto es para hacer el fetch en un componente de react

useEffect(() => {
  fetchData().then((data) => {
    console.log(data)
  })
}, [])
