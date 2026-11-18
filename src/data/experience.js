// Derived view over portfolio.json (legacy shape the current WorkExperience section consumes).
import { experiences } from "./portfolio";
import jspl from '../assets/jspl.png';
import asu from '../assets/asu.png';
import iu from '../assets/iuLogo.png';
import ripik from '../assets/ripik.svg';
import headstarter from '../assets/headstarter.png';
import eyLogo from '../assets/eyLogo.png';
import mps from '../assets/mps.png';
import micron from '../assets/micron.avif';

const LOGOS = { jspl, asu, iu, ripik, headstarter, eyLogo, mps, micron };
const fmt = d => new Date(d + "T00:00:00").toLocaleString("en-US", { month: "short", year: "numeric" });

export const EXPERIENCES = [...experiences]
    .sort((a, b) => b.start.localeCompare(a.start))
    .map(e => ({
        ...e, // new-schema fields (id, lane, start, end, context, impact…) for the timeline and detail modal
        role: e.role, company: e.company, years: `${fmt(e.start)} – ${e.end ? fmt(e.end) : "Present"}`,
        desc: e.summary, details: e.built, techStack: e.stack, logo: LOGOS[e.logo],
    }));
