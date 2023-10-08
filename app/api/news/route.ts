//https://news.google.com/rss/search?q=incendios+cordoba
import convert from "xml-js";

const getNewsByQuery = async (query: string) => {
  const response = await fetch(
    `https://news.google.com/rss/search?q=${query}`,
    {
      mode: "no-cors",
    }
  );
  const xml = await response.text();
  const xmlToJson = convert.xml2json(xml, { compact: true, spaces: 4 });
  const json = JSON.parse(xmlToJson);

  if (!json?.rss?.channel?.item?.length) return [];

  // return first 10 news
  return json.rss.channel.item.slice(0, 10);
};

export async function GET(req: Request) {
  // Extract the `messages` from the body of the request
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  if (!query) return new Response("No query", { status: 400 });

  const news = await getNewsByQuery(query);

  return new Response(
    JSON.stringify({
      message: "pong",
      news,
    }),
    {
      status: 200,
    }
  );

  // Request the OpenAI API for the response based on the prompt
}
