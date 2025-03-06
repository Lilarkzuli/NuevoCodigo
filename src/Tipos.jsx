import { useState, useEffect } from 'react';
import './App.css';

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
    <div>
      <h2>{poke.id} - {poke.name}</h2>
      <img src={poke.sprites.front_default} alt={poke.name} />
      <p>Peso: {poke.weight} kg | Altura: {poke.height} cm</p>
    </div>
  );
};

//componente para tipo
const Tipo = ({poke})=>{
  if (!poke) return <div>Cargando datos...</div>;
  var datos= poke.types
  console.log(datos[0])
  var tipo1=datos[0].type
  console.log(tipo1)
  if ( datos.length == 2){
    var tipo2 = datos[1].type
  }
  else{
    tipo2 = ""
  }

  return(
    <div>
      <p> <a href={tipo1.url}>{tipo1.name} </a></p>
      <p> <a href={tipo2.url}>{tipo2.name} </a></p>
    </div>
  )

}


//componente para mostrar las habilidades
const Habilidades = ({poke})=>{
  if (!poke) return <div>Cargando datos...</div>;
  var datos= poke.abilities
  console.log(datos.length)
  var habil1=datos[0].ability
  if ( datos.length == 2){
    var habil2 = datos[1].ability
  }
  else{
    habil2 = ""
  }

  return(
    <div>
      <p> <a href={habil1.url}>{habil1.name} </a></p>
      <p> <a href={habil2.url}>{habil2.name} </a></p>

    </div>
  )





}
function Tipos() {
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
    <div>
      {/* Pasamos setPokemonData para que Findpoke actualice el estado en App */}
      <Findpoke num={numero} setPokemonData={setPokemon} />

      {/* Mostrar los datos del Pokémon si ya están disponibles */}
      <DatosPoke poke={pokemon} />
      <Tipo poke={pokemon}/>
      <Habilidades poke={pokemon}/>


      <button onClick={Disminuir}>Anterior Pokémon</button>
      <button onClick={Aumentar}>Siguiente Pokémon</button>
    </div>
  );
}

export default Tipos;
