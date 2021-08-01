import { useEffect } from "react";
import { useLocation } from "react-router";

import { useRecoilState } from "recoil";
import { searchValue as searchValueAtoms } from "../atoms";
import { recentlyRedirectedBecauseTyping as recentlyRedirectedBecauseTypingAtoms } from "../atoms";
const OnRouteChange = (props) => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtoms);
  const [recentlyRedirectedBecauseTyping, setRecentlyRedirectedBecauseTyping] =
    useRecoilState(recentlyRedirectedBecauseTypingAtoms);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname !== "/") setSearchValue("");
  }, [location]);

  return <>{props.children}</>;
};

export default OnRouteChange;
