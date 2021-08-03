import "./PopupMessage.css";

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const PopupMessage = ({ show, message, type }) => {
  return (
    <>
      <div
        className={`${
          show ? "show_popup_message" : "hide_popup_message"
        } ${type}_popup_message main_container_popup_message`}
      >
        <div className="main_message_popup_message">{message}</div>
        <div className="go_to_cart_popup_message">
          <Link to="/cart">
            <div className="go_to_cart_inner_popup_message">
              <p className="cart_message_popup_message">to cart</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PopupMessage;
