import { RootState } from "../reducers";
import { SearchState } from "../reducers/search";

export const searchSelector: (state: RootState) => SearchState = state => state.search;