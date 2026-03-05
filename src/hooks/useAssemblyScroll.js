import { useState, useEffect, useRef } from "react";
import { categorizedProjects } from "../data/projects";
import { EXPERIENCES } from "../data/experience";

export function useAssemblyScroll(asmRef, abtRef) {
    const [prog, setProg] = useState(0);
    const [inAssembly, setInAssembly] = useState(false);
    const [navUp, setNavUp] = useState(false);

    // Calculate dynamic stats
    const totalProjects = categorizedProjects.reduce((acc, cat) => acc + cat.projects.length, 0);
    const iosApps = categorizedProjects.find(cat => cat.type === "ios")?.projects.length || 0;
    const mlModels = (categorizedProjects.find(cat => cat.type === "ml")?.projects.length || 0) +
        (categorizedProjects.find(cat => cat.type === "vision")?.projects.length || 0);
    const yearsExp = Math.max(5, EXPERIENCES.length > 0 ?
        new Date().getFullYear() - parseInt(EXPERIENCES[EXPERIENCES.length - 1].years.match(/\d{4}/)?.[0] || 2020) : 5);

    const [counts, setCounts] = useState({ p: 0, a: 0, m: 0, y: 0 });
    const [ctrDone, setCtrDone] = useState(false);

    const progRef = useRef(0);
    const touchY = useRef(null);

    useEffect(() => { progRef.current = prog; }, [prog]);

    useEffect(() => {
        /* Is the assembly anchor scrolled to the top of the viewport? */
        const entered = () => {
            if (!asmRef.current) return false;
            const rect = asmRef.current.getBoundingClientRect();
            // Trigger when anchor is at or above viewport top AND still partially visible
            return rect.top <= 2 && rect.bottom > 0;
        };

        const onWheel = (e) => {
            if (!entered()) return;
            if (e.deltaY > 0 && progRef.current < 1) {
                e.preventDefault();
                const step = Math.min(Math.abs(e.deltaY), 150) / 150 * 0.07;
                const next = Math.min(1, progRef.current + step);
                progRef.current = next;
                setProg(next);
            } else if (e.deltaY < 0 && progRef.current > 0) {
                e.preventDefault();
                const step = Math.min(Math.abs(e.deltaY), 150) / 150 * 0.07;
                const next = Math.max(0, progRef.current - step);
                progRef.current = next;
                setProg(next);
            }
        };

        const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
        const onTouchMove = (e) => {
            if (!entered() || touchY.current === null) return;
            const dy = touchY.current - e.touches[0].clientY;
            touchY.current = e.touches[0].clientY;
            if (dy > 0 && progRef.current < 1) {
                e.preventDefault();
                progRef.current = Math.min(1, progRef.current + Math.abs(dy) * 0.007);
                setProg(progRef.current);
            } else if (dy < 0 && progRef.current > 0) {
                e.preventDefault();
                progRef.current = Math.max(0, progRef.current - Math.abs(dy) * 0.007);
                setProg(progRef.current);
            }
        };

        const onScroll = () => {
            setNavUp(window.scrollY > 50);

            if (asmRef.current) {
                const rect = asmRef.current.getBoundingClientRect();
                // Sticky handles overlap, just check if we are remotely viewing the block
                const inView = rect.bottom > 0 && rect.top < window.innerHeight;
                setInAssembly(inView);
            }

            if (abtRef.current && !ctrDone &&
                abtRef.current.getBoundingClientRect().top < window.innerHeight * 0.82) {
                setCtrDone(true);
                [{ k: "p", t: totalProjects }, { k: "a", t: iosApps }, { k: "m", t: mlModels }, { k: "y", t: yearsExp }].forEach(({ k, t: target }) => {
                    let c = 0;
                    const step = Math.max(0.1, target / 55);
                    const id = setInterval(() => {
                        c = Math.min(c + step, target);
                        setCounts(prev => ({ ...prev, [k]: Math.floor(c) }));
                        if (c >= target) clearInterval(id);
                    }, 22);
                });
            }
        };

        window.addEventListener("wheel", onWheel, { passive: false, capture: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("wheel", onWheel, { capture: true });
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove, { capture: true });
            window.removeEventListener("scroll", onScroll);
        };
    }, [ctrDone, asmRef, abtRef]);

    return { prog, setProg, inAssembly, navUp, counts, ctrDone };
}
