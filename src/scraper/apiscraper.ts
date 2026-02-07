import { API_SCRAPER_DOMAIN } from "./constants";
import { ParsedData, parser, ScraperData } from "./parser";

export const scraper = async (url: string): Promise<ParsedData> => {
  console.log({ url, AMAZON_PARTNER_TAG: process.env.AMAZON_PARTNER_TAG });
  try {
    const formattedUrl = `${API_SCRAPER_DOMAIN}/?api_key=${process.env.API_SCRAPER_KEY}&url=${url}&device_type=desktop&output_format=json&autoparse=true`;
    console.log({ formattedUrl });
    const response = await fetch(formattedUrl);
    // console.log({ response });
    const data = (await response.json()) as ScraperData;
    // console.log({ data });

    return parser(data) as ParsedData;
  } catch (error) {
    console.error("Error fetching data from Scraper API:", error);
    throw error;
  }
};

// scraper(
//   'https://www.amazon.es/Playstation-Consola-Digital-Modelo-Slim/dp/B0CLTBHXWQ/ref=sr_1_1?crid=1G19WUD6CZSM5&dib=eyJ2IjoiMSJ9.CtZVrA0ZzR8jzGvlA32tT7bEX6KVLEYCoEncNkkVUH018nBhv1wrRWMo0k8k86qmjopTMuZfQuxfKdEdWU6yFD2QWoMwCbkkRi8Ut7y0PvKf_9XFPnpjHBE1JorwPARblc_-mBJHStcgn6kbpCVO5DJSjBVXxnpWHDAqqZ8jfBl_Q-9Mnq8SrnL-sMF_uTNQsQboAe4PtnG3xcc7TKNyXIjt5-vMu7Bl4uFeNJn6xMjujAg7HaZc2aydrCXzd7bRBpfzLAIIV7H1nWxU1glzr0ZVMw0K137L0yu3yTK07d8.9xZ-XYR2rXx3de6jGVuqmyxkH0OO_jZ2bNDf_K-AMYM&dib_tag=se&keywords=playstation+5&qid=1761472368&sprefix=playstation%2Caps%2C113&sr=8-1'
// );
