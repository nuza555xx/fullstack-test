import axios, { AxiosRequestConfig } from 'axios';
import { PlaceSearchQuery, PlaceSearchResponse, PlaceSearchResult } from '../interfaces';
import { Environments } from '../../utils';

export class PlaceService {
  async getPlaces({ search, pageToken }: PlaceSearchQuery): Promise<PlaceSearchResult[]> {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

    const params = {
      query: search,
      language: 'th',
      type: 'restaurant',
      key: Environments.googleAPIKey,
      pageToken: pageToken,
    };

    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params,
    };

    const response = await axios<PlaceSearchResponse>(config);

    return response.data?.results;
  }
}
