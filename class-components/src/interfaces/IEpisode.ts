interface IAuthors {
  name: string;
}
export interface IEpisode {
  uid: string;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  directors: IAuthors[];
  writers: IAuthors[];
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
