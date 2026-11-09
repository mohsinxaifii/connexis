const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const asset = (path) => (path && path.startsWith("/") ? BASE + path : path);
