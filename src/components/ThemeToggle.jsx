export default function ThemeToggle({ isDark, toggle, t }) {
    return (
        <button onClick={toggle} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 20, padding: "6px 14px", cursor: "pointer",
            fontFamily: "'JetBrains Mono',monospace", fontSize: ".65rem",
            letterSpacing: ".1em", color: t.text, transition: "all .25s",
        }}>
            <span style={{ fontSize: "1rem" }}>{isDark ? "☀" : "◑"}</span>
            {isDark ? "LIGHT" : "DARK"}
        </button>
    );
}
