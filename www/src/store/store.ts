import { configureStore, combineReducers, Store } from "@reduxjs/toolkit";
import { PlaceState, placeReducer } from "./place/place.reducer";

export interface RootState {
  place: PlaceState;
}

const rootReducer = combineReducers<RootState>({
  place: placeReducer,
});

// Create the store
const store: Store<RootState> = configureStore({
  reducer: rootReducer,
});

export default store;
