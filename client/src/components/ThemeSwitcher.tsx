import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useThemeContext } from "../contexts/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitcher() {
  const { theme, switchTheme } = useThemeContext();
  return (
    <button className={`btn`} aria-label="Theme switcher" onClick={switchTheme}>
      {theme == "light" ? (
        <FontAwesomeIcon icon={faSun} className="size-6" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="size-6" />
      )}
    </button>
  );
}
