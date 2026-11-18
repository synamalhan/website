import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ClientOnly } from "vite-react-ssg";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { FONTS } from "./components/styles";
import GlobalStyle from "./components/GlobalStyle";
import OceanBg from "./components/OceanBg";
import Cursor from "./components/Cursor";
import Home from "./App";
import ArchivePage from "./pages/ArchivePage";
import ProjectPage from "./pages/ProjectPage";
import { projects } from "./data/portfolio";

function Shell() {
    const { theme: t } = useTheme();
    // The HTML is prerendered with desktop layout; hide until hydrated so the mobile breakpoint does not cause a layout shift.
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    return (
        <div style={{ visibility: ready ? "visible" : "hidden", background: t.bg, color: t.text, ...FONTS.inter, overflowX: "hidden", minHeight: "100vh", transition: "background .4s, color .4s" }}>
            <GlobalStyle />
            <ClientOnly>{() => <><OceanBg t={t} /><Cursor t={t} /></>}</ClientOnly>
            <Outlet />
        </div>
    );
}

const Layout = () => <ThemeProvider><Shell /></ThemeProvider>;

export default [{
    path: "/",
    Component: Layout,
    children: [
        { index: true, Component: Home },
        { path: "projects", Component: ArchivePage },
        { path: "projects/:id", Component: ProjectPage, getStaticPaths: () => projects.map(p => `projects/${p.id}`) },
    ],
}];
