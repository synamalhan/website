// Reads the "currently reading" shelf from Goodreads' public widget endpoint and returns plain data (no Goodreads script is ever run).
const USER = "148394728";
const decode = s => s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');

export async function fetchReading() {
    const res = await fetch(`https://www.goodreads.com/review/custom_widget/${USER}.Reading?shelf=currently-reading&num_books=5&order=d&sort=date_added&widget_id=1`);
    const html = (await res.text()).replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\//g, "/");
    const books = [...html.matchAll(/<a title="([^"]+)"[^>]*href="([^"]+)"[^>]*><img[^>]*src="([^"]+)"[\s\S]*?class="gr_custom_author_1">\s*by <a[^>]*>([^<]+)</g)]
        .map(m => ({ title: decode(m[1]), link: decode(m[2]).split("?")[0], cover: m[3].replace(/\._S[XY]\d+_/, "._SX318_"), author: decode(m[4]) }));
    if (!books.length) throw new Error("no books found (shelf empty or profile private)");
    return books;
}
