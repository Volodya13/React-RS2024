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

export class FetchEpisodes {
  getEpisodes = async (
    searchItem: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<FetchEpisodesResponse> => {
    const url = `https://stapi.co/api/v1/rest/episode/search?title=${encodeURIComponent(searchItem)}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Not fetched ${url}, status: ${response.status}`);
    }

    const data: FetchEpisodesResponse = await response.json();
    return {
      episodes: data.episodes.map((episode) => ({
        uid: episode.uid,
        title: episode.title,
        seasonNumber: episode.seasonNumber,
        episodeNumber: episode.episodeNumber,
        seriesTitle: episode.seriesTitle || '',
      })),
      page: data.page,
    };
  };
}
