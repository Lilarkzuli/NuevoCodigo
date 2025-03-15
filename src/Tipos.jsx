import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// Componente para obtener los datos del Pokémon
// const Findpoke = ({ num, setPokemonData }) => {
//   useEffect(() => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
//       .then(result => result.json())
//       .then(data => {
//         setPokemonData(data); //envia los fatos
//         console.log(data)
//       })
//       .catch(error => console.error("Error al obtener datos:", error));
//   }, [num, setPokemonData]);


// };

// // Componente para mostrar los datos del Pokémon
// const DatosPoke = ({ poke }) => {
//   if (!poke) return <div>Cargando datos...</div>;

//   return (
//     <div>
//       <h2>{poke.id} - {poke.name}</h2>
//       <img src={poke.sprites.front_default} alt={poke.name} />
//       <p>Peso: {poke.weight} kg | Altura: {poke.height} cm</p>
//     </div>
//   );
// };


//componente principal


// src/pages/TipoPage.js


function Tipos() {
  // Obtiene el parámetro "tipo" de la URL
  const { tipo } = useParams();

  return (
    <div>
      <h1>Información sobre el tipo: {tipo}</h1>
      {/* Aquí puedes agregar más detalles sobre el tipo */}
    </div>
  );
}

export default Tipos;

