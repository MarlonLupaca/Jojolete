import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Login';
import Registrarse from './Pages/Registrarse';
import Home from './Pages/Home';
import Productos from './Pages/Productos';
import Entradas from './Pages/Entradas';
import Categorias from './Pages/Categorias';
import Stock from './Pages/Stock';
import Reportes from './Pages/Reportes';
import Usuarios from './Pages/Usuarios';
import Alertas from './Pages/Alertas';

function App() {
  return (
    <>
      <HashRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
