import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import "./PokemonDetails.css";
const StatsList = ({ stats }) => {
  const [pokemonStats, setPokemonStats] = useState([]);

  useEffect(() => {
    const newStats = [];
    stats.forEach((stat) => {
      newStats.push({ stat: stat.base_stat, type: stat.stat.name });
    });

    setPokemonStats(newStats);
  }, []);

  return (
    <div className="main_container_stats_list">
      {pokemonStats.map((stats) => (
        <StatsCard stats={stats.stat} type={stats.type} />
      ))}
    </div>
  );
};

export default StatsList;
