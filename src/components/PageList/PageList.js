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
    <div>
      {currentPage !== 1 && (
        <div onClick={() => setCurrentPage((currentPage) => currentPage - 1)}>
          Left
        </div>
      )}
      <div>
        {range.map((number) => (
          <Number currentPage={currentPage} number={number} />
        ))}
      </div>
      {!isLastPage && (
        <div onClick={() => setCurrentPage((currentPage) => currentPage + 1)}>
          Right
        </div>
      )}
    </div>
  );
};

export default PageList;
