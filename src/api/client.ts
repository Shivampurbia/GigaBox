import { create } from "axios";

// const token = getTokenFromStorage();

export const apiClient = create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${token}`
  },
});
