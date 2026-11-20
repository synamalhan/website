import { useEffect, useState } from "react";
import seed from "../data/reading.json";

// Live "currently reading" list from the site's API, polled every 5 minutes. The build-time copy shows first and covers any API failure.
export function useReading() {
    const [books, setBooks] = useState(seed);
    useEffect(() => {
        const API = window.location.hostname === "localhost" ? "http://localhost:3001" : (import.meta.env.VITE_API_URL || "http://localhost:3001");
        const load = () => fetch(`${API}/api/reading`).then(r => r.ok ? r.json() : []).then(b => b.length && setBooks(b)).catch(() => {});
        load();
        const id = setInterval(load, 5 * 60 * 1000);
        return () => clearInterval(id);
    }, []);
    return books;
}
