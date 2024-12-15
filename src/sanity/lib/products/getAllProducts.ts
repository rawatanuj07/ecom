import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCT_QUERY = defineQuery(`
        *[
        _type == "product"

        ] | order(name asc)
    `);
  try {
    //Use sanityFetch to send the query
    const products = await sanityFetch({
      query: ALL_PRODUCT_QUERY,
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
