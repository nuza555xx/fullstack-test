import { PlaceSearchResponse } from "@utils/interfaces";
import {
  PlaceActionTypes,
  FETCH_PLACE_REQUEST,
  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_FAILURE,
} from "./place.action";

export interface PlaceState {
  loading: boolean;
  data: PlaceSearchResponse | null;
  error: string | null;
}

const initialState: PlaceState = {
  loading: false,
  data: null,
  error: null,
};

export function placeReducer(
  state = initialState,
  action: PlaceActionTypes
): PlaceState {
  switch (action.type) {
    case FETCH_PLACE_REQUEST:
      return {
        ...state,
        loading: action.loading,
        error: null,
      };
    case FETCH_PLACE_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        data: action.payload,
        error: null,
      };
    case FETCH_PLACE_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
}
