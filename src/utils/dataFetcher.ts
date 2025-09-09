import { env } from "@/conf";

type EpisodeT = {
  date: Date;
  name: string;
  url: URL;
};

type DataT = EpisodeT[][];

async function getData() {
  const data: DataT = [];

  try {
    const res = await fetch(env.API_URL, {
      method: 'GER',
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      }
    });
    const json = await res.json();
    for (const season of json) {
      // I know that this it is not good solution.
      // TODO: Validate data in right way.
      data.push(season.map((episode: Record<string, unknown>) => ({
        date: new Date(episode.date as Date),
        name: `${episode.name}`,
        url: new URL(episode.url as string)
      })))
    }
  }
  catch {
    return [] as DataT;
  }
  return data;
}

export { type DataT };
export default getData;
