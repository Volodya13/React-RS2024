export interface Authors {
  name: string;
}
export interface Episode {
  uid: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  directors: Authors[];
  writers: Authors[];
  series: {
    uid: string;
    title: string;
  };
  season: {
    uid: string;
    title: string;
  };
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom: number | null;
  stardateTo: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  usAirDate: string;
}

interface FetchEpisodesResponse {
  page: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  episodes: Episode[];
}

export class FetchEpisodes {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://stapi.co/api/v1/rest';
  }

  async getEpisodes(pageNumber: number, pageSize: number): Promise<FetchEpisodesResponse> {
    const response = await fetch(
      `${this.baseUrl}/episode/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async getEpisodeById(id: string): Promise<Episode> {
    const response = await fetch(`${this.baseUrl}/episode?uid=${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.episode;
  }

  async searchEpisodes(query: string): Promise<Episode[]> {
    const response = await fetch(`${this.baseUrl}/episode/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({ title: query }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: FetchEpisodesResponse = await response.json();
    return data.episodes;
  }
}
