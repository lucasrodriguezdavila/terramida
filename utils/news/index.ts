import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
export interface New {
  title: {
    _text: string;
  };
  link: {
    _text: string;
  };
  guid: {
    _attributes: {
      isPermaLink: string;
    };
    _text: string;
  };
  pubDate: {
    _text: string;
  };
  description: {
    _text: string;
  };
  source: {
    _attributes: {
      url: string;
    };
    _text: string;
  };
}

export const getNewsByQuery = async (query: string | undefined) => {
  if (!query) return [];

  const response = await fetch(
    `${window.location.origin}/api/news?query=${query}`,
    {
      mode: "no-cors",
    }
  );
  const json = await response.json();
  if (!json?.news?.length) return [];

  const newsUnordered = json.news as New[];

  // order by date
  const news = newsUnordered.sort((a, b) => {
    const dateA = dayjs(a.pubDate._text);
    const dateB = dayjs(b.pubDate._text);
    if (dateA.isBefore(dateB)) return 1;
    if (dateA.isAfter(dateB)) return -1;
    return 0;
  });

  return news as New[];
};

export const useNews = (address: string | undefined) => {
  return useQuery(["news", address], {
    queryFn: () => getNewsByQuery("incendios " + address),
    enabled: !!address,
  });
};
