import { useThemeContext } from "./contexts/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useEffect, useState } from "react";
import UnitSwitcher from "./components/UnitSwitcher";
import Weather from "./components/Weather";
import LocationInput from "./components/LocationInput";
import { Unit } from "./types";
import useLocation from "./hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";

function App() {
  const { theme } = useThemeContext();
  const themeClass = theme == "dark" ? "theme-dark" : "theme-light";
  const [unit, setUnit] = useState<Unit>("C");
  const { location, isLoading, getLocation, setLocation, error } =
    useLocation();

  useEffect(getLocation, [getLocation]);

  return (
    <div
      className={`${themeClass} min-h-dvh p-4 bg-bgPrimary text-txtPrimary transition-all`}
    >
      <div className="flex gap-2 mb-4 justify-between">
        <div className="flex gap-2">
          <ThemeSwitcher />
          <UnitSwitcher
            unit={unit}
            switcher={() => {
              setUnit((u) => (u == "C" ? "F" : "C"));
            }}
          />
        </div>
        <div className="flex gap-2">
          <LocationInput setLocation={setLocation} />
          <button
            className="btn"
            aria-label="Detect location"
            onClick={getLocation}
          >
            <FontAwesomeIcon icon={faCrosshairs} className="size-6" />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="flex gap-2 items-center">
            <div className="loader p-2"></div>
            Getting Location
          </div>
        ) : location ? (
          <Weather location={location} unit={unit} />
        ) : (
          <div className="mt-4 text-xl text-center">
            {error?.code == 1 && "Please enable location access or "}
            {(error?.code == 2 || error?.code == 3) &&
              "Couldn't get device location. Please "}
            search for a location to see weather
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
