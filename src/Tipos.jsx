import { useState, useEffect } from "react";
import { FaListAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Volver from "./Volver";
// Componente para obtener los datos del Pokémon
const FindType = ({ typ, setTypePo }) => {
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${typ}/`)
      .then((result) => result.json())
      .then((data) => {
        setTypePo(data); //envia los fatos
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);
};

// // Componente para mostrar los datos del Pokémon
const DatosTipo = ({ tipo }) => {
  if (!tipo) return <div>Cargando datos...</div>;

  return (
    <div>
      <h2>{tipo.name}</h2>
    </div>
  );
};



const TipoRelaciones = ({ tipo }) => {

  if (!tipo) return <div>Cargando datos...</div>;

  var relaciones = tipo["damage_relations"];
  const resultado = Recorrer(relaciones)

  console.log("result", resultado)

  for (const [key, value] of Object.entries(resultado)) {
    console.log(key, value);

  }
  return (
    <div>
  <h2>Resultados</h2>
  {
    Object.entries(resultado).map(([clave, nombres]) => (
      <div key={clave}>
        <h4>{clave}</h4>
        {
          nombres.map((item, index) => (
            <div key={index}>
              <p className={item}>{item}</p>
            </div>
          ))
        }
      </div>
    ))
  }
</div>


  )

};
//falta arreglar esto para que lo retorne
function Recorrer(arry) {
  const resultado = {}


  // console.log(inicio)

  Object.entries(arry).forEach(([key, value]) => {
    resultado[key] = value.map((elemento) => elemento.name);
  })
  return resultado;
};




function Tipos() {
  // Obtiene el parámetro "tipo" de la URL
  const { tipo } = useParams();
  const [type, setType] = useState(); // Número del Pokémon

  return (
    <>
    <Volver/>
    <div>

      <h1>Información sobre el tipo: {tipo}</h1>
      {<FindType typ={tipo} setTypePo={setType} />}
      {<DatosTipo tipo={type} />}
      {<TipoRelaciones tipo={type} />}

      {/* Aquí puedes agregar más detalles sobre el tipo */}
    </div>
    </>
  );
}

export default Tipos;
