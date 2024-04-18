
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Mylist from './components/myList'
import Edititem from './components/editItem'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mylist/>}/>
          <Route path='/edit/:id' element={<Edititem/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

