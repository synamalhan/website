// Single typed entry point for src/data/portfolio.json. Sections import from here, never from the JSON directly.
import data from "./portfolio.json";
export const { profile, skills, categories, projects, experiences, internshipWork } = data;
export default data;

// Years since the earliest role, rounded down to the nearest half year.
export const yearsSinceFirstRole = () => {
    const first = Math.min(...experiences.map(e => Date.parse(e.start)));
    return Math.floor(((Date.now() - first) / 3.156e10) * 2) / 2;
};
