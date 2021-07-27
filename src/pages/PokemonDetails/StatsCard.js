import "./PokemonDetails.css";

import { useEffect, useState } from "react";

const StatsCard = ({ stats, type }) => {
  const [color, setColor] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  console.log(stats);
  console.log(type);

  useEffect(() => {
    let color = "white";
    if (type === "hp") color = "#FF5959";
    else if (type === "attack") color = "#F5AC78";
    else if (type === "defense") color = "#FAE078";
    else if (type === "special-attack") color = "#9DB7F5";
    else if (type === "special-defense") color = "#A7DB8D";
    else if (type === "speed") color = "#FA92B2";

    let pokemonType = "hp";
    if (type === "attack") pokemonType = "atk";
    else if (type === "defense") pokemonType = "def";
    else if (type === "special-attack") pokemonType = "sp.atk";
    else if (type === "special-defense") pokemonType = "sp.def";

    setColor(color);
    setPokemonType(pokemonType);
  }, []);

  return (
    <div
      className="main_container_stats_card"
      style={{ backgroundColor: color }}
    >
      <div>{stats}</div>
      <div>{pokemonType}</div>
    </div>
  );
};

export default StatsCard;
