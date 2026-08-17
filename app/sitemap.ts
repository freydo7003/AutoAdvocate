import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.autoadvocate.us";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
  url: `${baseUrl}/car-repair-estimate-too-high`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: `${baseUrl}/how-to-read-car-repair-estimate`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: `${baseUrl}/should-i-get-second-opinion-car-repair`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: `${baseUrl}/should-i-approve-this-car-repair`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
{
  url: `${baseUrl}/is-it-safe-to-drive-with-check-engine-light`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},
    {
      url: `${baseUrl}/analyze`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/diagnosis`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}