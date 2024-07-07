export interface Episode {
  uid: string;
  title: string;
  seasonNumber: number;
}

export interface FetchEpisodesResponse {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  episodes: Episode[];
}

export class FetchEpisodes {
  getEpisodes = async (url: string): Promise<FetchEpisodesResponse> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Not fetched ${url}, status: ${response.status}`);
    }
    return response.json();
  };
}
