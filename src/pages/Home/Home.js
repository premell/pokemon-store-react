import React from "react";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { popupMessage as popupMessageAtoms } from "../../atoms";

import Navbar from "../../components/Navbar/Navbar";
import PopupMessage from "../../shared/PopupMessage/PopupMessage";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";

import HomeCss from "./Home.module.css";
const Home = () => {
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);

  useEffect(() => {
    setPopupMessage((popupMessage) => ({ ...popupMessage, show: false }));
  }, []);

  return (
    <main className={HomeCss.main_container}>
      <PopupMessage
        show={popupMessage.show}
        message={popupMessage.message}
        type={popupMessage.type}
      />
      <Navbar />
      <MainContainer />
      <Footer />
    </main>
  );
};

export default Home;
