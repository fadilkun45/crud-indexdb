import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page1 from './page/Page1'
import Page2 from './page/Page2'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Page1 />} />
        <Route path='/page2/test' element={<Page2 />} />
    </Routes>
    </BrowserRouter>
    )
}

export default App