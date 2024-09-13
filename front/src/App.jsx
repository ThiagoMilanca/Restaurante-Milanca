import Navbar from './components/Navbar/Navbar';
import Register from './views/Register/Register';
import Turnero from './views/Turnos/MisTurnos';
import Menu from "./views/Menu/Menu";
import Home from './views/Home/Home';
import LoginForm from './views/Login/Login';
import { Routes,Route } from "react-router-dom";

function App() {
  return(
  <>
  <Navbar />
    <Routes>
      <Route path='/menu' element={<Menu />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/appointments' element={<Turnero />} />
      <Route path='/' element={<Home />} />
    </Routes>
  </>)

}

export default App
