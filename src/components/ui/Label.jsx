import { useTheme } from "../../theme/ThemeContext";
import { FONTS } from "../styles";

export default function Label({ children, center }) {
    const { theme: t } = useTheme();
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 10, ...FONTS.mono, fontSize: ".62rem", letterSpacing: ".35em",
            color: t.cyan, textTransform: "uppercase", marginBottom: 10, justifyContent: center ? "center" : "flex-start"
        }}>
            <span style={{ width: 22, height: 1, background: t.cyan, display: "inline-block" }} />
            {children}
        </div>
    );
}
