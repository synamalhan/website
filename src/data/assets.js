// Project images by filename, resolved by Vite to hashed URLs.
const files = import.meta.glob("../assets/projects/*", { eager: true, query: "?url", import: "default" });
export const projectImage = name => files[`../assets/projects/${name}`];
