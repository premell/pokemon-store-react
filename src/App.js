import Navbar from "../components/Navbar/Navbar";
import SidePanelFilters from "../components/SidePanelFilters/SidePanelFilters";
import PokemonList from "../components/PokemonList/PokemonList";

const App = () => {
  return (
    <main>
      <Navbar />
      <SidePanelFilters />
      <PokemonList />
    </main>
  );
};

export default App;
