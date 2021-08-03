import { useEffect } from "react";
import { useLocation } from "react-router";

import { useRecoilState } from "recoil";
import { searchValue as searchValueAtoms } from "../atoms";
import { recentlyRedirectedBecauseTyping as recentlyRedirectedBecauseTypingAtoms } from "../atoms";
import { popupMessage as popupMessageAtoms } from "../atoms";

const OnRouteChange = (props) => {
  const [popupMessage, setPopupMessage] = useRecoilState(popupMessageAtoms);
  const location = useLocation();
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [recentlyRedirectedBecauseTyping, setRecentlyRedirectedBecauseTyping] =
    useRecoilState(recentlyRedirectedBecauseTypingAtoms);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname !== "/") setSearchValue("");
    const newPopupMessage = {
      ...popupMessage,
      show: false,
    };
    setPopupMessage(newPopupMessage);
  }, [location]);

  return <>{props.children}</>;
};

export default OnRouteChange;
