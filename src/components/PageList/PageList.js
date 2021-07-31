import "./PageList.css";

import { IconContext } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Number from "./Number";

const setRange = (currentPage, maxPages) => {
  console.log(maxPages);
  const range = [];
  if (currentPage <= 6) {
    for (let i = 1; i <= 10; i++) {
      range.push(i);
      if (i >= maxPages) break;
    }
  } else {
    for (let i = currentPage - 5; i < 5 + currentPage; i++) {
      range.push(i);
      if (i >= maxPages) break;
    }
  }
  return range;
};

const PageList = ({
  currentPage,
  setCurrentPage,
  isLastPage,
  pokemonsPerPage,
  numberOfPokemon,
}) => {
  console.log(isLastPage);
  const range = setRange(
    currentPage,
    Math.ceil(numberOfPokemon / pokemonsPerPage)
  );
  return (
    <div className="page_main_container_page_list">
      <IconContext.Provider
        value={{
          style: { color: "black", cursor: "pointer" },
        }}
      >
        {currentPage !== 1 && (
          <div onClick={() => setCurrentPage((currentPage) => currentPage - 1)}>
            <IoIosArrowBack size={20} />
          </div>
        )}
        <div className="page_container_page_list">
          {range.map((number) => (
            <Number
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              number={number}
            />
          ))}
        </div>
        {!isLastPage && (
          <div onClick={() => setCurrentPage((currentPage) => currentPage + 1)}>
            <IoIosArrowForward size={20} />
          </div>
        )}
      </IconContext.Provider>
    </div>
  );
};

export default PageList;
