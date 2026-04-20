export const FONTS = {
    mono: { fontFamily: "'Courier New', monospace" },
    orb: { fontFamily: "'Nunito', sans-serif" },
    inter: { fontFamily: "'Inter', sans-serif" },
};

export const btnBase = {
    ...{ fontFamily: "'Nunito', sans-serif" },
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
