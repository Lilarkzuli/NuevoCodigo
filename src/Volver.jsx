import { Link } from 'react-router-dom';
import './Css/Volver.css';
import { FaArrowLeft } from "react-icons/fa";
function Volver() {
  // Obtiene el parámetro "tipo" de la URL

  return (
    <div>
      <button>
      <Link class="arrow-text" to="/pages/ListaPoke" >
        <div class="arrow-wrapper">
         <FaArrowLeft class="arrow"/>Volver  
      
        </div>
        </Link>
      </button>

    </div>
  );
}

export default Volver;
