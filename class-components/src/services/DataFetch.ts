export interface Episode {
  uid: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  seriesTitle: string;
}

export interface FetchEpisodesResponse {
  episodes: Episode[];
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
}

export interface ApiEpisode {
  uid: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  series: {
    uid: string;
    title: string;
  };
}

export interface ApiFetchEpisodesResponse {
  episodes: ApiEpisode[];
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
}

export class FetchEpisodes {
  getEpisodes = async (
    searchItem: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FetchEpisodesResponse> => {
    const url = `https://stapi.co/api/v1/rest/episode/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        title: searchItem,
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    const data: ApiFetchEpisodesResponse = await response.json();
    return {
      episodes: data.episodes.map((episode: ApiEpisode) => ({
        uid: episode.uid,
        title: episode.title,
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        seriesTitle: episode.series.title,
      })),
      page: data.page,
    };
  };

  searchEpisodes = async (searchItem: string): Promise<Episode[]> => {
    const url = `https://stapi.co/api/v1/rest/episode/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        title: searchItem,
        pageNumber: '0',
        pageSize: '10',
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
    }

    const data: ApiFetchEpisodesResponse = await response.json();
    return data.episodes.map((episode: ApiEpisode) => ({
      uid: episode.uid,
      title: episode.title,
      seasonNumber: episode.seasonNumber,
      episodeNumber: episode.episodeNumber,
      seriesTitle: episode.series.title,
    }));
  };
}
