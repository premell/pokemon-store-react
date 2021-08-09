import "./PageList.css";

const Number = ({ currentPage, number, setCurrentPage }) => {


  return (
    <div
      onClick={() => setCurrentPage(number)}
      className={`${currentPage === number ? "currentPage" : ""
        } number_page_list`}
    >
      {number}
    </div>
  );
};

export default Number;
