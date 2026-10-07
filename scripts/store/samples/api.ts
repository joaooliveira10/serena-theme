export interface Item {
  id: string;
  name: string;
  price: number;
}

const CACHE_MS = 60_000;

export const formatMoney = (value: number) => "$" + value.toFixed(2);

/** Talks to the shop API and keeps each answer for one minute. */
export class ShopApi {
  private cache = new Map<string, Item[]>();

  constructor(private readonly baseUrl = "/api/v1") {}

  async items(category: string): Promise<Item[]> {
    const cached = this.cache.get(category);
    if (cached) return cached;

    const res = await fetch(`${this.baseUrl}/items?category=${category}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const items = (await res.json()) as Item[];
    this.cache.set(category, items);
    setTimeout(() => this.cache.delete(category), CACHE_MS);
    return items;
  }
}
