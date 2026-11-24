const API_BASE = 'https://vectorsigma.org/briefer/api/v1';
const CUSTOMER = 6;

async function fetchJson(url, attempts = 4) {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        const res = await fetch(url);

        if (res.status === 429) {
            if (attempt === attempts) {
                const error = new Error('busy');
                error.busy = true;
                throw error;
            }
            const seconds = Number(res.headers.get('Retry-After')) || 2;
            await new Promise((resolve) => setTimeout(resolve, Math.min(seconds, 10) * 1000));
            continue;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }
}