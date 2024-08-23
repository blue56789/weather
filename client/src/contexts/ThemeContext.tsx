import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  switchTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  function switchTheme() {
    setTheme((t) => (t == "dark" ? "light" : "dark"));
  }
  useEffect(() => {
    const listener = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkThemeMediaQuery.addEventListener("change", listener);
    return () => {
      darkThemeMediaQuery.removeEventListener("change", listener);
    };
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("ThemeContext is being used outside of its provider");
  return context;
}
