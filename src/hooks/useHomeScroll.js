import { useState, useEffect } from "react";
import { categorizedProjects } from "../data/projects";
import { yearsSinceFirstRole } from "../data/portfolio";

// Nav "scrolled" state and the About-section stat counters. (The old scroll-jacking assembly is gone.)
export function useHomeScroll(abtRef) {
    const [navUp, setNavUp] = useState(false);
    const [counts, setCounts] = useState({ p: 0, a: 0, m: 0, y: 0 });
    const [ctrDone, setCtrDone] = useState(false);

    const count = type => categorizedProjects.find(c => c.type === type)?.projects.length || 0;
    const totalProjects = categorizedProjects.reduce((acc, c) => acc + c.projects.length, 0);
    const targets = { p: totalProjects, a: count("ios"), m: count("ml") + count("vision"), y: yearsSinceFirstRole() };

    useEffect(() => {
        const onScroll = () => {
            setNavUp(window.scrollY > 50);
            if (ctrDone || !abtRef.current || abtRef.current.getBoundingClientRect().top >= window.innerHeight * 0.82) return;
            setCtrDone(true);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCounts(targets); return; }
            Object.entries(targets).forEach(([k, target]) => {
                let c = 0;
                const step = Math.max(0.1, target / 55);
                const id = setInterval(() => {
                    c = Math.min(c + step, target);
                    setCounts(prev => ({ ...prev, [k]: Math.floor(c) }));
                    if (c >= target) clearInterval(id);
                }, 22);
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [ctrDone, abtRef]);

    return { navUp, counts };
}
