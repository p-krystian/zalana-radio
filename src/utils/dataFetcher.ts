import { env } from "@/conf";

type EpisodeT = {
  date: Date;
  name: string;
  url: string;
};

type DataT = EpisodeT[][];

async function getData() {
  const data: DataT = [];

  try {
    const res = await fetch(env.API_URL, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
    const json = await res.json();
    for (const seasonRaw of json) {
      const season: DataT[number] = [];
      for (const episodeRaw of seasonRaw) {
        const episodeDate = new Date(episodeRaw.date);
        if (episodeDate.getTime() > Date.now()) {
          continue;
        }
        season.push({
          date: episodeDate,
          name: episodeRaw.name,
          url: episodeRaw.url,
        });
      }
      data.push(season);
    }
  }
  catch (e: unknown) {
    console.warn(`DATA FETCH ERROR!`, e);
    return [] as DataT;
  }
  return data;
}

export { type DataT };
export default getData;
