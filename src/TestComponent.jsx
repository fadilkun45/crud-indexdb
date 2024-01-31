import { Box, Button } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

const TestComponent = () => {
    const [number, setNumber] = useState(0)
    const [darkMode, setDarkMode] = useState(false)
    const testFunc = useMemo(() => {
        Berat()
    },[number])

  return (
   <>
    <Box color={darkMode ? "white" : "black"} backgroundColor={darkMode ? "black" : "white"} p="20">
    <p>components</p>
    </Box>
    {testFunc }
    <input type="number" onChange={(v) => setNumber(number + parseInt(v.target.value))}/>

    <Button onClick={() => setDarkMode(!darkMode)}>Ganti warna</Button>
   </>
  )
}

export default TestComponent


function Berat () {
    for(let i = 0 ; i < 1000000000 ; i++){}
    return "berat page"
}