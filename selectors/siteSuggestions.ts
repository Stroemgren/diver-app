import { RootState } from "../reducers";
import { ISiteSuggestion } from "divermodels";

export const siteSuggestionsSelector: (state: RootState) => ISiteSuggestion[] = state => state.siteSuggestions.toArray();