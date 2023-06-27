import { PlaceSearchResponse } from "@utils/interfaces";
import { RootState } from "../store";

export const selectPlaceData = (
  state: RootState
): PlaceSearchResponse | null => {
  return state.place.data;
};

export const selectPlaceLoading = (state: RootState): boolean => {
  return state.place.loading;
};

export const selectPlaceError = (state: RootState): string | null => {
  return state.place.error;
};
