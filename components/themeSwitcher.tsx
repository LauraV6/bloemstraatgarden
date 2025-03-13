"use client";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import styles from "./themeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const [mount, setMount] = useState(false);
  const {systemTheme, theme, setTheme} = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => {
    setMount(true);
  }, []);
  return mount ? (
      <button
        className={`button button--cta ${styles.themeSwitch}`}
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      >
        <FontAwesomeIcon icon={currentTheme == "dark" ? faSun : faMoon} />
        {currentTheme == "dark" ? "Light" : "Dark"}
      </button>
  ) : null;
};
export default ThemeSwitcher;