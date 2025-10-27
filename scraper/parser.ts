import json from './data.json';
export type ScraperData = typeof json;

export type ParsedData = {
  title: string;
  id: string;
  productImage: string;
  bullets_points: string[];
  description: string;
  pricing: string;
};

export const parser = (data: ScraperData): ParsedData => {
  return {
    title: data.name,
    id: data.product_information.ASIN,
    productImage: data.images[0],
    bullets_points: data.feature_bullets,
    description: data.full_description,
    pricing: data.pricing,
  };
};
