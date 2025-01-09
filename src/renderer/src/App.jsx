import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Registrarse from './Pages/Registrarse'
import Home from './Pages/Home'
import Productos from './Pages/Productos'
import Entradas from './Pages/Entradas'
import Categorias from './Pages/Categorias'
import Stock from './Pages/Stock'
import Reportes from './Pages/Reportes'
import Usuarios from './Pages/Usuarios'
import Alertas from './Pages/Alertas'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registrarse" element={<Registrarse />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path='/Productos' element={<Productos/>}></Route>
          <Route path='/Entradas' element={<Entradas/>}></Route>
          <Route path='/Categorias' element={<Categorias/>}></Route>
          <Route path='/Stock' element={<Stock/>}></Route>
          <Route path='/Reportes' element={<Reportes/>}></Route>
          <Route path='/Usuarios' element={<Usuarios/>}></Route>
          <Route path='/Alertas' element={<Alertas/>}></Route>

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

