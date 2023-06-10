export const getMockedSidebarOptions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON)
    }, 1000)
  })
// me devuelve una promesa con el json un seg luego

useEffect(() => {
  const fetchData = async () => {
    const response = await getMockedSidebarOptions()
  }
  fetchData()
}, [])

//lo llamo y obtiene el json en response
