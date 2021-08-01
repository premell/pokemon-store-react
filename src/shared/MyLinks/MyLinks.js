import { IconContext } from "react-icons";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./MyLinks.css";

const goToWebsite = (url) => (window.location.href = url);
const MyLinks = () => {
  return (
    <div className="main_container_my_links">
      <IconContext.Provider
        value={{
          style: { cursor: "pointer" },
        }}
      >
        <div
          className="container_my_links"
          onClick={() => goToWebsite("https://github.com/premell")}
        >
          <AiFillGithub size={30} />
        </div>
        <div
          className="container_my_links"
          onClick={() =>
            goToWebsite(
              "https://www.linkedin.com/in/elmer-lingest%C3%A5l-3571021a8/"
            )
          }
        >
          <AiFillLinkedin size={30} />
        </div>
      </IconContext.Provider>
    </div>
  );
};
export default MyLinks;
