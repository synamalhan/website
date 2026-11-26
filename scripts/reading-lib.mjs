// "Currently reading" from Hardcover's GraphQL API (status_id 2 = Currently Reading). Needs HARDCOVER_TOKEN from hardcover.app/account/api.
const QUERY = `{ me { user_books(where: { status_id: { _eq: 2 } }, order_by: { updated_at: desc }, limit: 5) {
  book { title slug image { url } contributions { author { name } } } } } }`;

export async function fetchReading() {
    const token = process.env.HARDCOVER_TOKEN;
    if (!token) throw new Error("HARDCOVER_TOKEN is not set");
    const res = await fetch("https://api.hardcover.app/v1/graphql", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` },
        body: JSON.stringify({ query: QUERY }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    const books = (json.data?.me?.[0]?.user_books ?? []).map(({ book: b }) => ({
        title: b.title, link: `https://hardcover.app/books/${b.slug}`, cover: b.image?.url ?? "", author: b.contributions?.[0]?.author?.name ?? "",
    }));
    if (!books.length) throw new Error("no books found (nothing marked Currently Reading)");
    return books;
}
