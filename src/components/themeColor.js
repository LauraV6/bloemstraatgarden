import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const setDark = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }
};

const setLight = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  }
};

const storedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
const prefersDark = typeof window !== 'undefined' ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches : null;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
} else {
  setLight();
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

const ThemeColor = () => {
  return (
    <div className="themeswitch">
        <input type="checkbox" id="themeColor" onChange={toggleTheme} defaultChecked={defaultDark}/>
        <label htmlFor="themeColor">
            <FontAwesomeIcon icon={faSun} className="sun"/>
            <FontAwesomeIcon icon={faMoon} className="moon"/>
        </label>
    </div>
  );
};

export default ThemeColor;