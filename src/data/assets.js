// Project images by filename, resolved by Vite to hashed URLs.
const files = import.meta.glob("../assets/projects/*", { eager: true, query: "?url", import: "default" });
// A full URL (e.g. a raw.githubusercontent.com link into the project repo) is used as is; a bare filename is a bundled asset.
export const projectImage = name => (/^https?:\/\//.test(name) ? name : files[`../assets/projects/${name}`]);
