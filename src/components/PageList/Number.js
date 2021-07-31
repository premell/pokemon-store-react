import "./PageList.css";

const Number = ({ currentPage, number }) => {
  return (
    <div className={currentPage === number ? "currentPage" : ""}>{number}</div>
  );
};

export default Number;
