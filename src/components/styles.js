export const FONTS = {
    // Labels and small headers: a bold monospace (was Courier New). Display: Bricolage Grotesque. Body: Plus Jakarta Sans.
    mono: { fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontWeight: 700 },
    orb: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    inter: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
};

export const btnBase = {
    ...{ fontFamily: "'Bricolage Grotesque', sans-serif" },
    fontWeight: 700,
    fontSize: "1rem",
    letterSpacing: ".05em",
    padding: "12px 28px",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "all .25s",
    display: "inline-block",
    borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
    border: "2px solid",
    boxShadow: "4px 4px 0px",
};

/**
 * Safely adds/replaces alpha to a hex color string.
 * Supports #RGB, #RGBA, #RRGGBB, #RRGGBBAA.
 */
export const addAlpha = (hex, alpha) => {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex;
    let base = hex;
    if (hex.length === 9) base = hex.slice(0, 7); // #RRGGBBAA -> #RRGGBB
    else if (hex.length === 5) base = hex.slice(0, 4); // #RGBA -> #RGB
    return base + alpha;
};
