// Derived views over portfolio.json (legacy shapes the current sections consume).
import { categories, projects } from "./portfolio";

export const categorizedProjects = categories.map(c => ({
    ...c,
    projects: projects.filter(p => p.category === c.type).map(p => ({
        title: p.title, anchorId: `project-${p.id}`, motivation: p.summary, techStack: p.stack, details: p.details, link: p.links.repo || "",
    })),
}));
