import { Head } from "vite-react-ssg";
import { profile } from "../data/portfolio";

export const SITE = "https://synamalhan.github.io/website";
const DEFAULT = "Syna Malhan: CS student at Arizona State University (Data Science minor, class of 2027) building machine learning and software systems. Seeking ML, AI and SWE new-grad roles.";

// Title, description, canonical, Open Graph and Twitter tags for one page. `path` is the route ("/" or "/projects/x").
export default function Seo({ title, description = DEFAULT, path = "/" }) {
    const url = SITE + (path === "/" ? "/" : path);
    const image = `${SITE}/og.png`;
    const person = {
        "@context": "https://schema.org", "@type": "Person", name: profile.name, url: `${SITE}/`,
        description: DEFAULT, alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
        sameAs: [profile.links.linkedin, profile.links.github],
    };
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Syna Malhan" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            {path === "/" && <script type="application/ld+json">{JSON.stringify(person)}</script>}
        </Head>
    );
}
