import { createContext, useContext, useState, useCallback } from "react";
import { THEMES } from "./themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const toggleTheme = useCallback(() => setIsDark(d => !d), []);
    const theme = isDark ? THEMES.dark : THEMES.light;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
