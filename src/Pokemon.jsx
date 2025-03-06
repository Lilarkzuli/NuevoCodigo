import { useState, useEffect, useRef } from 'react';
import './Css/Pokemon.css';

import { FaArrowLeft } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";

// Componente para obtener los datos del Pokémon
const Findpoke = ({ num, setPokemonData }) => {
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then(result => result.json())
      .then(data => {
        setPokemonData(data); //envia los fatos
        console.log(data)
      })
      .catch(error => console.error("Error al obtener datos:", error));
  }, [num, setPokemonData]);


};

// Componente para mostrar los datos del Pokémon
const DatosPoke = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;

  return (
    <div class="spritebox">
      <h2>{poke.id} - {poke.name}</h2>
      <img src={poke.sprites.front_default} alt={poke.name} />
      <p>Peso: {poke.weight} kg | Altura: {poke.height} cm</p>
    </div>
  );
};




//componente para tipo
const Tipo = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var datos = poke.types
  console.log(datos[0])
  var tipo1 = datos[0].type
  console.log(tipo1)

  if (datos.length == 2) {
    var tipo2 = datos[1].type
    var ensenartipo2 = <p class="margen"> <a href={tipo2.url}>{tipo2.name} </a></p>
  }
  else {
    ensenartipo2 = null
  }

  return (
    <div class="boxtype">
      {/* <p class="margen"> <a href={tipo1.url}>{tipo1.name} </a></p> */}
      <p class="margen"> <a href={`./Tipos.jsx/${tipo1.url}`}>{tipo1.name} </a></p>

      {ensenartipo2}
    </div>
  )

}

//gritos
const Gritos = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var lloros = poke.cries
  var lloro1 = lloros.latest
  console.log(lloro1)


  return(
    <>
      <h3>Grito</h3>
      <audio controls>
        <source src={lloro1} type="audio/ogg"></source>
      </audio>
    </>
  )
   
  
}

//componente para mostrar las habilidades
const Habilidades = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var datos = poke.abilities
  console.log(datos.length)
  var habil1 = datos[0].ability
  if (datos.length == 2) {
    var habil2 = datos[1].ability
    var ensenarhabili2 = <p class="margen"> <a href={habil2.url}>{habil2.name} </a></p>

  }
  else {

    ensenarhabili2 = null
  }

  return (
    <div class="habilibox">

      <p class="margen"> <a href={habil1.url}>{habil1.name} </a></p>
      {ensenarhabili2}

    </div>
  )

}
function Pokemon() {
  const [numero, setNumero] = useState(1); // Número del Pokémon
  const [pokemon, setPokemon] = useState(null); // Datos del Pokémon

  const Aumentar = () => {
    if (numero < 1009) {
      setNumero(numero + 1);
    }
  };

  const Disminuir = () => {
    if (numero > 1) {
      setNumero(numero - 1);
    }
  };





  return (
    <>
      <div class="box">
        <div class="subbox">
          {/* Pasamos setPokemonData para que Findpoke actualice el estado en App */}
          <Findpoke num={numero} setPokemonData={setPokemon} />
         
          {/* Mostrar los datos del Pokémon si ya están disponibles */}

          <DatosPoke poke={pokemon} />
          
          <Gritos poke={pokemon}/>
          <h3>Tipo</h3>

          <Tipo poke={pokemon} />
          <h3>Habilidad</h3>
          <Habilidades poke={pokemon} />

        </div>
        <div class="boxboton">
          <button  class="cambboton" onClick={Disminuir}> <FaArrowLeft /></button>
          <button  class="cambboton" onClick={Aumentar}><FaArrowRight /></button>
          </div>
      </div>
      <div class="box2">
        


      </div>
    </>
  );
}

export default Pokemon;
