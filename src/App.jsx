import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemon from './Pokemon';
import Tipos from './Tipos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pages/index" element={<Pokemon />} />
        <Route path="/tipos/:tipo" element={<Tipos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;