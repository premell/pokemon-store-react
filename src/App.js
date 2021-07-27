import Navbar from "../components/Navbar/Navbar";
import SidePanelFilters from "../components/SidePanelFilters/SidePanelFilters";
import PokemonList from "../components/PokemonList/PokemonList";
import PopupMessage from "./shared/PopupMessage/PopupMessage";
import { popupMessage as popupMessageAtoms } from "../../atoms";

const App = () => {
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);
  console.log(popupMessage);
  return (
    <main>
      {popupMessage.show && <PopupMessage />}
      <Navbar />
      <SidePanelFilters />
      <PokemonList />
    </main>
  );
};

export default App;
