import { useTheme } from "../../theme/ThemeContext";
import { FONTS } from "../styles";

export default function Tag({ children }) {
    const { theme: t } = useTheme();
    return (
        <span style={{
            ...FONTS.mono, fontSize: ".5rem", letterSpacing: ".14em", padding: "3px 8px",
            border: `1px solid ${t.border}`, color: t.textMute, textTransform: "uppercase", borderRadius: 2
        }}>{children}</span>
    );
}
