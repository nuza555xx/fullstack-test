import { Dispatch } from "redux";
import { AxiosRequestConfig } from "axios";
import { requestAPI } from "@utils/utils";
import { PlaceSearchResponse, ResponseAPI } from "@utils/interfaces";

export const FETCH_PLACE_REQUEST = "FETCH_PLACE_REQUEST";
export const FETCH_PLACE_SUCCESS = "FETCH_PLACE_SUCCESS";
export const FETCH_PLACE_FAILURE = "FETCH_PLACE_FAILURE";

interface FetchPlaceRequestAction {
  type: typeof FETCH_PLACE_REQUEST;
  loading: boolean;
}

interface FetchPlaceSuccessAction {
  type: typeof FETCH_PLACE_SUCCESS;
  loading: boolean;
  payload: PlaceSearchResponse;
}

interface FetchPlaceFailureAction {
  type: typeof FETCH_PLACE_FAILURE;
  loading: boolean;
  error: string;
}

export type PlaceActionTypes =
  | FetchPlaceRequestAction
  | FetchPlaceSuccessAction
  | FetchPlaceFailureAction;

export function fetchPlace(configs: AxiosRequestConfig<any>) {
  return (dispatch: Dispatch<PlaceActionTypes>) => {
    dispatch({ type: FETCH_PLACE_REQUEST, loading: true });
    requestAPI<ResponseAPI<PlaceSearchResponse>>(configs)
      .then((response) => {
        dispatch({
          type: FETCH_PLACE_SUCCESS,
          loading: false,
          payload: response.results,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_PLACE_FAILURE,
          loading: false,
          error: error.message,
        });
      });
  };
}
