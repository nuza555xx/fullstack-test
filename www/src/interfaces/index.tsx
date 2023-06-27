export interface CardImageData {
  title: string;
  subTitle: string;
  avatarImage: string;
  cardImage: string;
  description: string;
  description2: string;
}

export interface ResponseAPI<T> {
  statiCode: number;
  message: string;
  results: T;
}
export interface PlaceSearch {
  title: string;
  description: string;
  photoRef: string;
}
export interface PlaceSearchResponse {
  nextPage?: string;
  payload: PlaceSearch[];
}
