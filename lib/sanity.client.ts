import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // "ogim55wm"
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION; // "2023-02-12"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
