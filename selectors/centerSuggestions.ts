import { RootState } from "../reducers";
import { ICenterSuggestion } from "divermodels";

export const centerSuggestionsSelector: (state: RootState) => ICenterSuggestion[] = state => state.centerSuggestions.toArray();