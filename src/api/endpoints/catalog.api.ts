// src/api/endpoints/catalog.api.ts
import { apiClient } from "../client";
import { CatalogPage, Product } from "../types/product.types";

const PAGE_SIZE = 12;

export async function getCatalogPage(
  pageParam: number, // this is "skip"
  category: string | null,
  signal?: AbortSignal,
): Promise<CatalogPage> {
  const url = category ? `/products/category/${category}` : "/products";
  const requestStartedAt = Date.now();

  // if (__DEV__) {
  //   console.log("[catalog] request", {
  //     category: category ?? "all",
  //     limit: PAGE_SIZE,
  //     skip: pageParam,
  //     url,
  //   });
  // }

  try {
    const { data } = await apiClient.get<CatalogPage>(url, {
      params: { limit: PAGE_SIZE, skip: pageParam },
      signal,
    });

    if (__DEV__) {
      console.log("[catalog] response", {
        category: category ?? "all",
        count: data.products.length,
        durationMs: Date.now() - requestStartedAt,
        nextSkip:
          data.skip + data.limit < data.total ? data.skip + data.limit : null,
        skip: data.skip,
        total: data.total,
      });
    }

    return data;
  } catch (error) {
    if (__DEV__) {
      console.log("[catalog] failed", {
        aborted: signal?.aborted ?? false,
        category: category ?? "all",
        durationMs: Date.now() - requestStartedAt,
        skip: pageParam,
      });
    }

    throw error;
  }
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const { data } = await apiClient.get<{ slug: string }[]>(
    "/products/categories",
    { signal },
  );
  return data.map((c) => c.slug);
}

export async function getProduct(
  productId: number,
  signal?: AbortSignal,
): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/products/${productId}`, {
    signal,
  });
  return data;
}
