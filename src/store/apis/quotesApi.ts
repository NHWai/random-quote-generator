export function apiFetchRandomQuote() {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/advice`);
}

export function apiFetchByTerm(term: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/advice/search/${term}`);
}

export function apiFetchBySlipId(slipId: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/advice/${slipId}`);
}
