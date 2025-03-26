import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemon from './Pokemon';
import Tipos from './Tipos';
import ListaPoked from './ListaPokedex';
import Test from './Test';
function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/pages/listaPoke" element={<ListaPoked />} />
        <Route path="/pages/tipos/:tipo" element={<Tipos />} />
        <Route path="/pages/index/:poke" element={<Pokemon />} />
        <Route path="/pages/Test" element={<Test/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;