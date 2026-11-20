import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ClientOnly } from "vite-react-ssg";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { FONTS } from "./components/styles";
import GlobalStyle from "./components/GlobalStyle";
import OceanBg from "./components/OceanBg";
import Tilt3D from "./components/Tilt3D";
import Cursor from "./components/Cursor";
import Home from "./App";
import ArchivePage from "./pages/ArchivePage";
import ProjectPage from "./pages/ProjectPage";
import { projects } from "./data/portfolio";

// A deploy replaces hashed chunk files, so a tab opened before it can request a chunk that no longer exists. Reload once to pick up the new build.
if (typeof window !== "undefined") {
    window.addEventListener("vite:preloadError", () => {
        try { if (sessionStorage.getItem("chunk-reload")) return; sessionStorage.setItem("chunk-reload", "1"); } catch { /* storage blocked: still reload once */ }
        window.location.reload();
    });
}

// Replaces React Router's default "Unexpected Application Error" screen.
function ErrorPage() {
    return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24, background: "#1c1c1f", color: "#eee", fontFamily: "Inter, system-ui, sans-serif" }}>
            <div>
                <h1 style={{ fontSize: "1.6rem", marginBottom: 12 }}>Something went wrong</h1>
                <p style={{ marginBottom: 20, opacity: 0.8 }}>The page failed to load. Try again, or head back home.</p>
                <button onClick={() => window.location.reload()} style={{ padding: "10px 20px", borderRadius: 10, marginRight: 12, cursor: "pointer" }}>Reload</button>
                <Link to="/" style={{ color: "#e062f3" }}>Home</Link>
            </div>
        </div>
    );
}

function Shell() {
    const { theme: t } = useTheme();
    // The HTML is prerendered with desktop layout; hide until hydrated so the mobile breakpoint does not cause a layout shift.
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    return (
        <div style={{ visibility: ready ? "visible" : "hidden", background: t.bg, color: t.text, ...FONTS.inter, overflowX: "hidden", minHeight: "100vh", transition: "background .4s, color .4s" }}>
            <GlobalStyle />
            <ClientOnly>{() => <><OceanBg t={t} /><Cursor t={t} /><Tilt3D /></>}</ClientOnly>
            <Outlet />
        </div>
    );
}

const Layout = () => <ThemeProvider><Shell /></ThemeProvider>;

export default [{
    path: "/",
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
        { index: true, Component: Home },
        { path: "projects", Component: ArchivePage },
        { path: "projects/:id", Component: ProjectPage, getStaticPaths: () => projects.map(p => `projects/${p.id}`) },
    ],
}];
