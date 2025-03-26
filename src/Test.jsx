import { useState, useEffect, useRef } from "react";

import './Css/Pokedex.css';
import { Link } from 'react-router-dom';
import Volver from "./Volver";
import { useInView } from 'react-intersection-observer';

// Componente para obtener los datos del Pokémon
const FindPoke = async (num) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

function Test() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(1);

  const { ref: loaderRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const loadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    const newPokemon = await FindPoke(num);
    console.log(newPokemon)
    if (newPokemon) {
      setItems(prevItems => [...prevItems, newPokemon]);
      setNum(prevNum => prevNum + 1);
      console.log(items)
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView,loadMore]);

  return (
    <div className="pokemon-wrapper">
      <div className="scroll-container">
        {items.map((item) => (
          <Link to={`/pages/index/${item.name}`} key={item.id}>
            <div className="item-box">
              <p className="item-name">{item.name}</p>
              <img src={item.sprites.front_default} alt={item.name} className="item-img" />
            </div>
          </Link>
        ))}
        
        <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
          {loading ? 'Cargando...' : '⬇️ Desplázate para cargar más'}
        </div>
      </div>
    </div>
  );
}

export default Test;
