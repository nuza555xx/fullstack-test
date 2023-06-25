export interface PlaceSearchQuery {
  search: string;
  pageToken?: string;
}

export interface LoginWithProviderDto {
  email: string;
  displayName: string;
  authenToken: string;
  avatar: string;
}

export interface PlaceSearchResponse {
  nextPage?: string;
  payload: { title: string; description: string; photo: string }[];
}

export interface PlaceSearchAPIResponse {
  html_attributions: unknown[];
  next_page_token: string;
  results: PlaceSearchResult[];
  status: string;
}

export interface PlaceSearchResult {
  business_status: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  place_id: string;
  plus_code?: Pluscode;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  price_level?: number;
}

interface Pluscode {
  compound_code: string;
  global_code: string;
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface OpeningHours {
  open_now: boolean;
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}
