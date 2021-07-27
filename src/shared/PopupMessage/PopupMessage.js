import PopupMessageCss from "./PopupMessage.module.css";

const PopupMessage = ({ message, type }) => {
  return (
    <>
      <div
        className={`${PopupMessageCss.main_container} ${PopupMessageCss.type}`}
      >
        <div className={PopupMessageCss.main_message}>{message}</div>
        <div className={PopupMessageCss.go_to_cart}>to cart</div>
      </div>
    </>
  );
};

export default PopupMessage;
