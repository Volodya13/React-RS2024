export interface IAuthors {
  uid: string;
  name: string;
}

export interface IEpisode {
  usAirDate: string;
  title: string;
  uid: string;
  episode: {
    uid: string;
    title: string;
    seasonNumber: number;
    episodeNumber: number;
    directors: IAuthors[];
    writers: IAuthors[];
    characters: IAuthors[];
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
  };
}
