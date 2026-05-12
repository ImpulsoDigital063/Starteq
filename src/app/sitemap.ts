import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { POSTS } from "@/lib/posts";

const SITE_URL = "https://starteq.vercel.app";

const CATEGORIES = [
  "computadores",
  "cpu",
  "gpu",
  "mobo",
  "ram",
  "ssd",
  "fonte",
  "gabinete",
  "cooler",
  "mouse",
  "teclado",
  "monitor",
  "headset",
  "mousepad",
  "cadeira",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/produtos`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/montador`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/quem-somos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/como-comprar`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/trocas-devolucoes`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/produtos/categoria/${c}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/produtos/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...categories, ...products, ...posts];
}
