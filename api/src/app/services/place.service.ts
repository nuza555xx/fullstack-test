import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PlaceSearchAPIResponse, PlaceSearchQuery, PlaceSearchResponse } from '../interfaces';
import { Environments, Logger } from '../../utils';
import snackcaseKeys from 'snakecase-keys';
import { hostname } from 'os';

export class PlaceService {
  private readonly logger: Logger = new Logger(PlaceService.name);

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

    const places = response.data.results.map((place) => {
      const payload = {
        title: place.name,
        description: place.formatted_address,
        photoRef: place.photos?.length
          ? `${Environments.Hostname}/api/place/media?refId=${place.photos[0].photo_reference}`
          : '',
      };

      return payload;
    });
    return { payload: places, nextPage: response.data.next_page_token };
  }

  async getPlaceMedia(photoReference: string): Promise<AxiosResponse<Buffer> | undefined> {
    try {
      const url = 'https://maps.googleapis.com/maps/api/place/photo';

      const params = {
        maxwidth: 400,
        photoReference: photoReference,
        key: Environments.googleAPIKey,
      };

      const config: AxiosRequestConfig = {
        method: 'GET',
        url,
        params: snackcaseKeys(params),
        responseType: 'arraybuffer',
      };

      const response = await axios(config);
      return response;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
