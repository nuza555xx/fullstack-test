import axios, { AxiosRequestConfig } from 'axios';
import {
  PlaceSearchAPIResponse,
  PlaceSearchQuery,
  PlaceSearchResponse,
  PlaceSearchResult,
} from '../interfaces';
import { Environments } from '../../utils';

export class PlaceService {
  async getPlaces({ search, pageToken }: PlaceSearchQuery): Promise<PlaceSearchResponse> {
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

    const response = await axios<PlaceSearchAPIResponse>(config);

    const places = await Promise.all(
      response.data.results.map(async (place) => {
        const payload = {
          title: place.name,
          description: place.formatted_address,
          photo: '',
        };
        if (place.photos) payload.photo = await this.getPlacePhoto(place.photos[0].photo_reference);

        return payload;
      }),
    );
    return { payload: places, nextPage: response.data.next_page_token };
  }
  getPlacePhoto(photoReference: string): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&photo_reference=${photoReference}&key=${
      Environments.googleAPIKey
    }`;
  }
}
