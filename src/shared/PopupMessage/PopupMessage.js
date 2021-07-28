import "./PopupMessage.css";

import clsx from "clsx";
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
            <p>to cart</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PopupMessage;
