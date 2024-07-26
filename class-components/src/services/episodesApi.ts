import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEpisode } from '../interfaces/IEpisode';
import { IFetchEpisodesResponse } from '../interfaces/IFetchEpisodesResponse';

const BASE_URL = 'https://stapi.co/api/v1/rest';

export const episodesAPI = createApi({
  reducerPath: 'episodesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllEpisodes: builder.query<IFetchEpisodesResponse, { pageNumber: number; pageSize: number }>(
      {
        query: ({ pageNumber, pageSize = 9 }) => ({
          url: `/episode/search`,
          params: {
            pageNumber,
            pageSize,
          },
        }),
      },
    ),
    getEpisodeById: builder.query<IEpisode, string>({
      query: (id) => ({
        url: `/episode/search`,
        params: {
          uid: id,
        },
      }),
    }),
  }),
});

export const { useGetAllEpisodesQuery, useGetEpisodeByIdQuery } = episodesAPI;
