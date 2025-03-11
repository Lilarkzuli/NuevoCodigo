import { useState, useEffect, useRef, Fragment } from "react";
import "./Css/Pokemon.css";

import { FaArrowLeft } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";

// Componente para obtener los datos del Pokémon
const Findpoke = ({ num, setPokemonData }) => {
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then((result) => result.json())
      .then((data) => {
        setPokemonData(data); //envia los fatos
        console.log(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [num, setPokemonData]);
};

// Componente para mostrar los datos del Pokémon
const DatosPoke = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;

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

//componente para tipo
const Tipo = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;
  var datos = poke.types;
  var tipo1 = datos[0].type;

  var ensenartipo1 = (
    <p className={`margen ${tipo1.name} tipos`}>
      {" "}
      <a href={tipo1.url}>{tipo1.name} </a>
    </p>
  );
  //si hay ese dato o no entonces, lo mostrará o no
  const ensenartipo2 =
    datos.length === 2 ? (
      <p className={`margen ${datos[1].type.name} tipos`}>
        <a href={datos[1].type.url}>{datos[1].type.name}</a>
      </p>
    ) : null; // Si no hay segundo tipo, no se renderiza

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


const Findevo = ({ numer, poke }) => {
  console.log(poke)
  if (!poke) return <div>Cargando datos...</div>
  const [numero, setNumero] = useState(1)
  const [vueltas, setVueltas] = useState(1); // Número de evolución actual
  const [evo, setEvo] = useState([]);


  

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/evolution-chain/${vueltas}/`)
      .then((result) => result.json())
      .then((data) => {
        // Estado para almacenar la cadena de evolución

        var n_poke = poke.name
        var nombre = data.chain
        var evos = recorrerEvoluciones(nombre)
        setEvo(evos)



        if (!evos.includes(n_poke)) {

          if( numer < numero){
            var resul= numero- numer
            console.log("este resta: " . resul)
            console.log(resul)
            setVueltas((prev) => Math.max(prev - resul, 1));
            setNumero (Math.min(numer, 1));

          }

          else {

            var resul= numero -numer;
            console.log("este suma: " . resul)
            setVueltas(anterior => anterior + 1)
            setNumero(numer)
          }


        }




      })
      .catch((error) =>{

        console.error("Error al obtener datos:", error)
        setVueltas(anterior => anterior + 1)

      })

  }, [numer, poke, vueltas]); // Solo depende de numer

  console.log(evo, vueltas)


  if(evo.includes(poke.name) ){
   
    return (
      <div>
        <h3>Cadena de Evolución</h3>
        <ul>
          {
            evo.map(item =>
              <li>{item}</li>
            )
          }
        </ul>

      </div>
    )
    setNumero(1)
  }
  else{
    return (
        <div>
          <h3>Cadena de Evolución</h3>
          <ul>
           Cargando...
          </ul>

        </div>
      );
    }
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

//componentes de movimiento
const Movimiento = ({ poke }) => {
  if (!poke) return <div>Cargando datos...</div>;

  // Obtener los movimientos
  const movimientos = poke.moves;
  // console.log(movimientos)

  return (
    <>
      <div class="statsbox ">
        <h3>Movimientos</h3>
        <table>
          <thead>
            <tr>
              <th>Movimiento</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((datos, index) => (
              <tr key={index}>
                <td>{datos.move.name}</td>
                <td> {index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
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

  const esenumero = (event) => {
    if (event.key === "Enter") {

      console.log(event.target.value, typeof event.target.value);
      var num = event.target.value;
      num=parseInt(num)

      if (num > 1 && num < 1009) {
        setNumero(num); // Actualiza el número solo cuando se presiona Enter
      } else if (num === "") {
        setNumero(1); // Si el campo está vacío, vuelve a 1
      }
    w
    }}

  return (
    <>
      <div class="boxall">
        <div class="box">
          <div class="subbox">
            {/* Pasamos setPokemonData para que Findpoke actualice el estado en App */}
            <Findpoke num={numero} setPokemonData={setPokemon} />

            {/* Mostrar los datos del Pokémon si ya están disponibles */}

            <DatosPoke poke={pokemon} />
            <h3>Tipo</h3>
            <Tipo poke={pokemon} />
            <h3>Habilidad</h3>
            <Habilidades poke={pokemon} />
            <Gritos poke={pokemon} />
          </div>
          <div class="boxboton">
            <button class="cambboton" onClick={Disminuir} >
              {" "}
              <FaArrowLeft />
            </button>
            <input class="mediano"  type="number" min="1" max="1009"  onKeyDown={esenumero}></input>
            <button class="cambboton" onClick={Aumentar}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div class="box2">
          <div class="subbox">
            <Stats poke={pokemon} />
            {/* <Movimiento  poke={pokemon} /> */}
            <Findevo numer={numero} poke={pokemon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokemon;
