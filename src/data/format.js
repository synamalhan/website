export const fmtDate = iso => new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
export const statusLabel = p =>
    p.status === "in-progress" ? `In progress${p.projectedCompletion ? ` · projected ${fmtDate(p.projectedCompletion)}` : ""}` : null;
