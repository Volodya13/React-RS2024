import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IData } from '../interfaces/IData.ts';
import { IEpisode } from '../interfaces/IEpisode.ts';

const BASE_URL = 'https://stapi.co/api/v1/rest';

export const episodesAPI = createApi({
  reducerPath: 'episodesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllEpisodes: builder.query<IData, number>({
      query: (page = 0) => ({
        url: `/episode/search`,
        params: {
          pageNumber: page,
          pageSize: 15,
        },
      }),
    }),
    getEpisodeById: builder.query<IEpisode, string>({
      query: (id) => ({
        url: `/episode`,
        params: {
          uid: id,
        },
      }),
    }),
    searchEpisodes: builder.query<IData, { title: string }>({
      query: (searchParams) => ({
        url: '/episode/search',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(searchParams as Record<string, string>),
      }),
    }),
  }),
});

export const { useGetAllEpisodesQuery, useGetEpisodeByIdQuery, useLazySearchEpisodesQuery } =
  episodesAPI;
