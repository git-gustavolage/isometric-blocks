export async function loadPatterns(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("failed to fetch patterns.json");
    const json = await res.json();
    return json.patterns || [];
}
