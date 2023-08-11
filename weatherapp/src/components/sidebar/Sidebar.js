import React, { useState } from "react";
import style from "./sidebar.module.css";
import { FaHamburger } from "react-icons/fa";

export const Sidebar = ({ handleSubmit, input, setInput, data }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className={style.sidebarComp}>
      <FaHamburger
        onClick={showSidebar}
        className={sidebar ? ` ${style.hamburger}` : style.hamburgerActive}
      />
      <form
        onSubmit={handleSubmit}
        className={
          sidebar ? ` ${style.sidebar} ${style.sidebarActive}` : style.sidebar
        }
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={style.searchInput}
          placeholder="Type area ..."
        />
        <button className={style.closeBtn} onClick={showSidebar}>
          x
        </button>

        <h3 className={style.sidebarHeader}>Weather Details</h3>
        <div className={style.details}>
          <ul>
            <li>Cloudy</li>
            <li>Humidty</li>
            <li>wind</li>
          </ul>

          <ul>
            <li>{data?.clouds?.all}</li>
            <li>{data?.main?.humidity}</li>
            <li>{data?.wind?.speed}</li>
          </ul>
        </div>
      </form>
    </div>
  );
};
