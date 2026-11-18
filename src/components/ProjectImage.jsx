import { projectImage } from "../data/assets";

// Architecture diagram as a thumbnail (diagrams are 4:3, so contain on a white card keeps them legible).
export default function ProjectImage({ project, ratio = "16 / 10", style }) {
    const img = project.images.find(i => i.kind === "diagram") || project.images[0];
    if (!img) return null;
    return <img src={projectImage(img.src)} alt={img.alt} loading="lazy"
        style={{ width: "100%", aspectRatio: ratio, objectFit: "contain", background: "#fff", borderRadius: 10, display: "block", ...style }} />;
}
