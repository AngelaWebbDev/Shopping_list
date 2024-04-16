import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Mylist from './components/myList'
import axios from 'axios'
import Details from './components/details'
import Edititem from './components/editItem'

function App() {
  const [itemlist, setItemlist] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/getAll')
        .then(res => { setItemlist(res.data) })
        .catch(err => console.log('appjsx getAll err: ', err))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mylist itemlist={itemlist} setItemlist={setItemlist}/>}/>
          <Route path='/details/:id' element={<Details  itemlist={itemlist} setItemlist={setItemlist}/>}/>
          <Route path='/edit/:id' element={<Edititem itemlist={itemlist} setItemlist={setItemlist}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

