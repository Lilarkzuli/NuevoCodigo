import { useState, useEffect, useRef, Fragment, Suspense } from "react";
import "./Css/Pokemon.css";

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Volver from "./Volver";

import Load from './Loading';


// // Componente para obtener los datos del Pokémon
const Findpoke = ({ setPokemonData, nombre }) => {
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .then((result) => result.json())
      .then((data) => {
        setPokemonData(data); //envia los fatos
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));

  }, [setPokemonData]);
};

// // Componente para mostrar los datos del Pokémon
const DatosPoke = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>
  return (
    <div class="spritebox">
      <h2>
        {poke.id} - {poke.name}
      </h2>
      <div class="imagenes">
        <img src={poke.sprites.front_default} alt={poke.name} />
        <img src={poke.sprites.back_default} alt={poke.name} />
      </div>
      <p>
        Peso: {poke.weight} kg | Altura: {poke.height} cm
      </p>
    </div>
  );
};

// //componente para tipo
const Tipo = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var datos = poke.types;
  var tipo1 = datos[0].type;

  const ensenartipo1 = (
    <p className={`margen ${tipo1.name} tipos`}>
      <Link to={`/pages/tipos/${tipo1.name}`}>{tipo1.name}</Link>

    </p>
  );

  const ensenartipo2 =
    datos.length === 2 ? (
      <p className={`margen ${datos[1].type.name} tipos`}>
        <Link to={`/pages/tipos/${datos[1].type.name}`}>{datos[1].type.name}</Link>
      </p>
    ) : null;
  return (
    <div class="boxtype">
      {ensenartipo1}
      {ensenartipo2}
    </div>
  );
};

//gritos
const Gritos = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var lloros = poke.cries;
  var lloro1 = lloros.latest;
  console.log(lloro1);

  return (
    <>
      <div class="gritobox">
        <h3>Grito</h3>
        <audio controls class="sonido">
          <source src={lloro1} type="audio/ogg"></source>
        </audio>
      </div>
    </>
  );
};






const Descrip = ({ poke }) => { //numer es la pokedex
  console.log(poke)

  if (!poke) return <div>Cargando datos...</div>
  const [descrip, setdescrip] = useState();

  useEffect(() => {
    if (!poke) return;

    // Obtener la cadena de evolución desde la especie del Pokémon
    fetch(poke.species.url)
      .then(res => res.json())
      .then(speciesData => {

        const species = speciesData.flavor_text_entries;
        console.log(species)
        for (let x = 0; x < species.length; x++) {
          var desc = species[x]
          if (desc.language.name == "es") {

            setdescrip(desc.flavor_text)
          }
        }
        console.log(species)
      }).catch(console.error);
  }, [poke]); // Solo depende del Pokémon actual
  return (
    <div>
      <h3>Descripción</h3>
      <p>{descrip}</p>
    </div>
  )


}
const Findevo = ({ poke }) => { //numer es la pokedex

  // if (!poke) return <div>Cargando datos...</div>
  const [evoChain, setEvoChain] = useState([]);

  useEffect(() => {
    if (!poke) return;

    // Obtener la cadena de evolución desde la especie del Pokémon
    fetch(poke.species.url)
      .then(res => res.json())
      .then(speciesData => {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        return fetch(evolutionChainUrl);
      })
      .then(res => res.json())
      .then(chainData => {
        const evolutions = recorrerEvoluciones(chainData.chain);
        setEvoChain(evolutions);
      }).catch(console.error);
  }, [poke]); // Solo depende del Pokémon actual


  return (
    <div>
      <h3>Cadena de Evolución</h3>
      <ul>
        {
          evoChain.map(item =>
            <li>{item}</li>
          )
        }
      </ul>

    </div>

  )

}




function recorrerEvoluciones(chain) {

  let evolutions = [];

  function traverse(evolution) {
    evolutions.push(evolution.species.name); // Guardamos el nombre del Pokémon
    if (evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach(nextEvolution => traverse(nextEvolution));
    }
  }

  traverse(chain);
  return evolutions;

}



//componente de las stats
const Stats = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;

  return (
    <div class="statsbox">
      <h3>Stats</h3>
      <table>
        <thead>
          <tr>
            <th>Estadística</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {poke.stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.stat.name}</td>
              <td>{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



//componente para mostrar las habilidades
const Habilidades = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var datos = poke.abilities;
  console.log(datos.length);
  var habil1 = datos[0].ability;
  if (datos.length == 2) {
    var habil2 = datos[1].ability;
    var ensenarhabili2 = (
      <p class="margen">
        {" "}
        <a href={habil2.url}>{habil2.name} </a>
      </p>
    );
  } else {
    ensenarhabili2 = null;
  }

  return (
    <div class="habilibox">
      <p class="margen">
        {" "}
        <a href={habil1.url}>{habil1.name} </a>
      </p>
      {ensenarhabili2}
    </div>
  );
};




function Pokemon() {
  const { poke } = useParams();
  const [pokemon, setPokemon] = useState(null);

  return (
    <>
      <Volver />
      <div className="boxall">

        <div className="box">
          <div className="subbox">

            <Findpoke nombre={poke} setPokemonData={setPokemon} />

            <DatosPoke poke={pokemon} />
            <h3>Tipo</h3>
            <Tipo poke={pokemon} />
            <h3>Habilidad</h3>
            <Habilidades poke={pokemon} />
            <Gritos poke={pokemon} />

          </div>
        </div>

        <div class="box2">
          <div class="subbox">
            <Descrip poke={pokemon} />
            <Stats poke={pokemon} />
            {/* <Movimiento  poke={pokemon} /> */}
            <Findevo poke={pokemon} />

          </div>


        </div>
      </div>
    </>
  )
}





export default Pokemon;