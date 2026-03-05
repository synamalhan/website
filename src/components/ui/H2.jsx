import { useTheme } from "../../theme/ThemeContext";
import { FONTS } from "../styles";

export default function H2({ children, style = {} }) {
    const { theme: t } = useTheme();
    return (
        <h2 style={{
            ...FONTS.orb, fontWeight: 900, fontSize: "clamp(1.8rem,3.8vw,3rem)", lineHeight: 1.05,
            color: t.textHi, marginBottom: 14, ...style
        }}>{children}</h2>
    );
}
