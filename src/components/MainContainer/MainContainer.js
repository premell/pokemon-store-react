import { useCallback, useEffect, useState } from "react";

import PokemonContainer from "../PokemonContainer/PokemonContainer";
import SidePanelFilters from "../SidePanelFilters/SidePanelFilters";

import MainContainerCss from "./MainContainer.module.css";

const MainContainer = () => {
  const [typeFilters, setTypeFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState({
    min: 0,
    max: 2500,
  });
  return (
    <div className={MainContainerCss.main_container}>
      <SidePanelFilters
        setPriceFilters={setPriceFilters}
        setTypeFilters={setTypeFilters}
        typeFilters={typeFilters}
        priceFilters={priceFilters}
      />
      <PokemonContainer
        setTypeFilters={setTypeFilters}
        setPriceFilters={setPriceFilters}
        typeFilters={typeFilters}
        priceFilters={priceFilters}
      />
    </div>
  );
};

export default MainContainer;
