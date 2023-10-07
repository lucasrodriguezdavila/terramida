interface New {
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

export const getNewsByQuery = async (query: string) => {
  const response = await fetch(
    `${window.location.origin}/api/news?query=${query}`,
    {
      mode: "no-cors",
    }
  );
  const json = await response.json();
  if (!json?.news?.length) return [];
  return json as New;
};
