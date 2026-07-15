import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site-content";
const routes = ["/", "/work", "/ai-engineering", "/projects"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: absoluteUrl(route), changeFrequency: "monthly", priority: route === "/" ? 1 : 0.8 })); }
