import clsx from "clsx";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import PopupMessageCss from "./PopupMessage.module.css";

const PopupMessage = ({message, type}) => {
  if(type === "positive"){

  return (
    <>
      <div
        className={`${PopupMessageCss.main_container} ${PopupMessageCss.positive}`}
      >
        <div className={PopupMessageCss.main_message}>{message}</div>
        <div className={PopupMessageCss.go_to_cart}>
          <Link to="/cart">
            <p>to cart</p>
          </Link>
        </div>
      </div>
    </>

  }
    else{
  return (
    <>
      <div
        className={`${PopupMessageCss.main_container} ${PopupMessageCss.negative}`}
      >
        <div className={PopupMessageCss.main_message}>{message}</div>
        <div className={PopupMessageCss.go_to_cart}>
          <Link to="/cart">
            <p>to cart</p>
          </Link>
        </div>
      </div>
    </>


    }
  );
};

export default PopupMessage;
