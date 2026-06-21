const SANITY_PROJECT_ID = 'p3c01d1l';
const SANITY_DATASET    = 'production';
const SANITY_API_VER    = '2024-01-01';
const SANITY_CDN        = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VER}/data/query/${SANITY_DATASET}`;

async function sanityFetch(query, params = {}) {
    const url = new URL(SANITY_CDN);
    url.searchParams.set('query', query);
    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(`$${k}`, JSON.stringify(v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Sanity error: ${res.status}`);
    const { result } = await res.json();
    return result;
}

function imageUrl(ref, width = 1200) {
    if (!ref) return null;
    const [, id, dimensions, format] = ref.split('-');
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}?w=${width}&auto=format`;
}

// Convierte Portable Text a HTML simple
function toHtml(blocks = []) {
    return blocks.map(block => {
        if (block._type !== 'block') return '';
        const text = block.children.map(span => {
            let t = span.text;
            if (span.marks?.includes('strong')) t = `<strong>${t}</strong>`;
            if (span.marks?.includes('em')) t = `<em>${t}</em>`;
            return t;
        }).join('');
        return `<p>${text}</p>`;
    }).join('');
}
