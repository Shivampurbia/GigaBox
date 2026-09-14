// src/queries/keys.ts
export const queryKeys = {
  catalog: (category: string | null) => ["catalog", category ?? "all"] as const,
  catalogOnline: (category: string | null, sessionId: string) =>
    ["catalog", category ?? "all", "online", sessionId] as const,
  search: (searchTerm: string) => ["search", searchTerm] as const,
  product: (productId: number) => ["product", productId] as const,
  categories: ["categories"] as const,
};
